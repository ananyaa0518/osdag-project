from rest_framework import serializers
from .models import Location

class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = '__all__'


class LocationDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = ('wind', 'seismic_zone', 'zone_factor', 'temp_max', 'temp_min')
