import random
from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from django.utils import timezone
from faker import Faker

# Si tus modelos están en apps separadas, impórtalos con tus rutas reales:
# de lo contrario, ajusta los nombres de las apps según tu proyecto.
# Reemplaza las líneas viejas por estas rutas reales basadas en tu estructura:
from myapps.category.models import Category
from myapps.item.models import Item
from myapps.borrower.models import Borrower
from myapps.loan.models import Loan

User = get_user_model()
fake = Faker('es_CO') # Configurado en español de Colombia para datos más reales

class Command(BaseCommand):
    help = 'Llena la base de datos con datos falsos aislados por usuario'

    def handle(self, *args, **kwargs):
        self.stdout.write(self.style.SUCCESS('Iniciando la generación de datos...'))

        # 1. Crear usuarios de prueba independientes
        usuarios_datos = [
            {'username': 'esneider_test', 'first_name': 'Esneider', 'last_name': 'Payarez', 'email': 'esneider@test.com'},
            {'username': 'carlos_test', 'first_name': 'Carlos', 'last_name': 'Gomez', 'email': 'carlos@test.com'},
            {'username': 'maria_test', 'first_name': 'Maria', 'last_name': 'Lopez', 'email': 'maria@test.com'},
        ]

        for u_data in usuarios_datos:
            user, created = User.objects.get_or_create(
                username=u_data['username'],
                defaults={
                    'first_name': u_data['first_name'],
                    'last_name': u_data['last_name'],
                    'email': u_data['email'],
                    'is_active': True
                }
            )
            if created:
                user.set_password('test1234') # Contraseña encriptada para todos
                user.save()
                self.stdout.write(f"Usuario creado: {user.username}")
            
            # --- GENERACIÓN AISLADA POR USUARIO ---
            
            # 2. Crear Categorías para ESTE usuario
            categorias_nombres = ['Electrónicos', 'Libros', 'Herramientas', 'Indumentaria', 'Videojuegos']
            categorias_creadas = []
            for cat_name in categorias_nombres:
                cat = Category.objects.create(
                    name=cat_name,
                    description=fake.sentence(nb_words=10),
                    is_deleted=False,
                    user=user # Forzamos el aislamiento
                )
                categorias_creadas.append(cat)

            # 3. Crear Prestatarios (Borrowers) para ESTE usuario
            prestatarios_creados = []
            for _ in range(5): # 5 amigos/prestatarios por usuario
                borrower = Borrower.objects.create(
                    name=fake.name(),
                    contact_info=fake.phone_number(),
                    is_deleted=False,
                    user=user # Forzamos el aislamiento
                )
                prestatarios_creados.append(borrower)

            # 4. Crear Ítems para ESTE usuario ligados a sus propias categorías
            items_creados = []
            ejemplos_items = ['Portátil ASUS', 'Libro Clean Code', 'Taladro Percutor', 'Cámara Canon', 'Balón de Fútbol']
            for nombre_item in ejemplos_items:
                item = Item.objects.create(
                    name=nombre_item,
                    description=fake.text(max_nb_chars=100),
                    is_deleted=False,
                    category=random.choice(categorias_creadas), # Usa solo sus categorías
                    user=user # Forzamos el aislamiento
                )
                items_creados.append(item)

            # 5. Crear Préstamos (Loans) cruzando solo los datos de ESTE usuario
            for _ in range(4): # 4 préstamos simulados por usuario
                item_elegido = random.choice(items_creados)
                borrower_elegido = random.choice(prestatarios_creados)
                
                lent_date = fake.date_time_between(start_date='-30d', end_date='now', tzinfo=timezone.get_current_timezone())
                due_date = lent_date + timezone.timedelta(days=random.randint(5, 15))
                
                # Simulamos si algunos ya fueron devueltos y otros siguen prestados
                returned_date = due_date - timezone.timedelta(days=random.randint(1, 3)) if random.choice([True, False]) else None

                Loan.objects.create(
                    lent_at=lent_date,
                    due_at=due_date,
                    returned_at=returned_date,
                    notes=fake.sentence(nb_words=6),
                    is_deleted=False,
                    item=item_elegido,
                    borrower=borrower_elegido,
                    user=user # Forzamos el aislamiento
                )

        self.stdout.write(self.style.SUCCESS('¡Base de datos poblada con éxito y completamente aislada!'))