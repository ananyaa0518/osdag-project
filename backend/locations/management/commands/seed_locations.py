from django.core.management.base import BaseCommand

from locations.models import Location


SAMPLE_LOCATIONS = [
    {
        'state': 'Andhra Pradesh',
        'district': 'Hyderabad',
        'wind': 44,
        'seismic_zone': 'I',
        'zone_factor': 0.1,
        'temp_max': 42.4,
        'temp_min': 11.4,
    },
    {
        'state': 'Andhra Pradesh',
        'district': 'Vijayawada',
        'wind': 50,
        'seismic_zone': 'I',
        'zone_factor': 0.16,
        'temp_max': 41.2,
        'temp_min': 14.3,
    },
    {
        'state': 'Assam',
        'district': 'Guwahati',
        'wind': 50,
        'seismic_zone': 'V',
        'zone_factor': 0.36,
        'temp_max': 40.3,
        'temp_min': 3,
    },
    {
        'state': 'Gujarat',
        'district': 'Ahmedabad',
        'wind': 39,
        'seismic_zone': 'II',
        'zone_factor': 0.16,
        'temp_max': 47.8,
        'temp_min': 2.2,
    },
    {
        'state': 'Gujarat',
        'district': 'Bhuj',
        'wind': 50,
        'seismic_zone': 'V',
        'zone_factor': 0.36,
        'temp_max': 47.8,
        'temp_min': -0.2,
    },
    {
        'state': 'Gujarat',
        'district': 'Rajkot',
        'wind': 39,
        'seismic_zone': 'II',
        'zone_factor': 0.16,
        'temp_max': 47.9,
        'temp_min': -0.6,
    },
    {
        'state': 'Gujarat',
        'district': 'Surat',
        'wind': 44,
        'seismic_zone': 'I',
        'zone_factor': 0.16,
        'temp_max': 45.6,
        'temp_min': 4.4,
    },
    {
        'state': 'Himachal Pradesh',
        'district': 'Shimla',
        'wind': 39,
        'seismic_zone': 'IV',
        'zone_factor': 0.24,
        'temp_max': 32.4,
        'temp_min': -12.2,
    },
    {
        'state': 'Karnataka',
        'district': 'Bengaluru',
        'wind': 33,
        'seismic_zone': 'I',
        'zone_factor': 0.1,
        'temp_max': 38.9,
        'temp_min': 7.8,
    },
    {
        'state': 'Maharashtra',
        'district': 'Mumbai',
        'wind': 44,
        'seismic_zone': 'I',
        'zone_factor': 0.16,
        'temp_max': 36.7,
        'temp_min': 12.2,
    },
    {
        'state': 'Maharashtra',
        'district': 'Nagpur',
        'wind': 44,
        'seismic_zone': 'I',
        'zone_factor': 0.1,
        'temp_max': 45.1,
        'temp_min': 7,
    },
    {
        'state': 'Maharashtra',
        'district': 'Nashik',
        'wind': 39,
        'seismic_zone': 'I',
        'zone_factor': 0.16,
        'temp_max': 42.3,
        'temp_min': 6.4,
    },
    {
        'state': 'Maharashtra',
        'district': 'Pune',
        'wind': 39,
        'seismic_zone': 'I',
        'zone_factor': 0.16,
        'temp_max': 40.2,
        'temp_min': 8.4,
    },
    {
        'state': 'Rajasthan',
        'district': 'Jaipur',
        'wind': 47,
        'seismic_zone': 'I',
        'zone_factor': 0.1,
        'temp_max': 48,
        'temp_min': -2.8,
    },
    {
        'state': 'Rajasthan',
        'district': 'Jodhpur',
        'wind': 47,
        'seismic_zone': 'III',
        'zone_factor': 0.1,
        'temp_max': 48.6,
        'temp_min': -3.2,
    },
    {
        'state': 'Rajasthan',
        'district': 'Udaipur',
        'wind': 47,
        'seismic_zone': 'I',
        'zone_factor': 0.1,
        'temp_max': 42.8,
        'temp_min': 3.6,
    },
    {
        'state': 'Tamil Nadu',
        'district': 'Chennai',
        'wind': 50,
        'seismic_zone': 'II',
        'zone_factor': 0.16,
        'temp_max': 38.2,
        'temp_min': 15,
    },
    {
        'state': 'Tamil Nadu',
        'district': 'Coimbatore',
        'wind': 39,
        'seismic_zone': 'I',
        'zone_factor': 0.16,
        'temp_max': 36.9,
        'temp_min': 14.8,
    },
    {
        'state': 'Tamil Nadu',
        'district': 'Madurai',
        'wind': 39,
        'seismic_zone': 'I',
        'zone_factor': 0.1,
        'temp_max': 39.3,
        'temp_min': 16.1,
    },
    {
        'state': 'Tamil Nadu',
        'district': 'Tiruchirappalli',
        'wind': 47,
        'seismic_zone': 'I',
        'zone_factor': 0.1,
        'temp_max': 37.8,
        'temp_min': 15.2,
    },
    {
        'state': 'Uttar Pradesh',
        'district': 'Agra',
        'wind': 47,
        'seismic_zone': 'II',
        'zone_factor': 0.16,
        'temp_max': 46.8,
        'temp_min': -1.4,
    },
    {
        'state': 'Uttar Pradesh',
        'district': 'Kanpur',
        'wind': 47,
        'seismic_zone': 'I',
        'zone_factor': 0.16,
        'temp_max': 46.8,
        'temp_min': -1,
    },
    {
        'state': 'Uttar Pradesh',
        'district': 'Lucknow',
        'wind': 47,
        'seismic_zone': 'I',
        'zone_factor': 0.16,
        'temp_max': 46.3,
        'temp_min': -0.3,
    },
    {
        'state': 'Uttar Pradesh',
        'district': 'Varanasi',
        'wind': 47,
        'seismic_zone': 'I',
        'zone_factor': 0.16,
        'temp_max': 46.1,
        'temp_min': -1.5,
    },
    {
        'state': 'West Bengal',
        'district': 'Durgapur',
        'wind': 47,
        'seismic_zone': 'II',
        'zone_factor': 0.16,
        'temp_max': 41.6,
        'temp_min': 5.2,
    },
    {
        'state': 'West Bengal',
        'district': 'Kolkata',
        'wind': 50,
        'seismic_zone': 'III',
        'zone_factor': 0.16,
        'temp_max': 38,
        'temp_min': 7,
    },
]


class Command(BaseCommand):
    help = 'Insert sample location data into the database.'

    def handle(self, *args, **options):
        created_count = 0
        updated_count = 0

        for row in SAMPLE_LOCATIONS:
            _, created = Location.objects.update_or_create(
                state=row['state'],
                district=row['district'],
                defaults={
                    'wind': row['wind'],
                    'seismic_zone': row['seismic_zone'],
                    'zone_factor': row['zone_factor'],
                    'temp_max': row['temp_max'],
                    'temp_min': row['temp_min'],
                },
            )
            if created:
                created_count += 1
            else:
                updated_count += 1

        self.stdout.write(
            self.style.SUCCESS(
                f'Seed complete. Created: {created_count}, Updated: {updated_count}'
            )
        )
