from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Location
from .serializers import LocationSerializer

@api_view(['GET'])
def get_states(request):
    states = Location.objects.values_list('state', flat=True).distinct().order_by('state')
    return Response(list(states))

@api_view(['GET'])
def get_districts(request, state):
    districts = Location.objects.filter(state__iexact=state).values_list('district', flat=True).distinct().order_by('district')
    if not districts:
        return Response({'error': 'State not found or has no districts'}, status=status.HTTP_404_NOT_FOUND)
    return Response(list(districts))

@api_view(['GET'])
def get_location_data(request):
    state = request.query_params.get('state')
    district = request.query_params.get('district')
    
    if not state or not district:
        return Response({'error': 'State and district parameters are required'}, status=status.HTTP_400_BAD_REQUEST)
        
    try:
        location = Location.objects.get(state__iexact=state, district__iexact=district)
        serializer = LocationSerializer(location)
        return Response({
            'wind': serializer.data['wind'],
            'seismic_zone': serializer.data['seismic_zone'],
            'zone_factor': serializer.data['zone_factor'],
            'temp_max': serializer.data['temp_max'],
            'temp_min': serializer.data['temp_min'],
        })
    except Location.DoesNotExist:
        return Response({'error': 'Location not found'}, status=status.HTTP_404_NOT_FOUND)
    except Location.MultipleObjectsReturned:
        # In case there are duplicates, return the first one
        location = Location.objects.filter(state__iexact=state, district__iexact=district).first()
        serializer = LocationSerializer(location)
        return Response({
            'wind': serializer.data['wind'],
            'seismic_zone': serializer.data['seismic_zone'],
            'zone_factor': serializer.data['zone_factor'],
            'temp_max': serializer.data['temp_max'],
            'temp_min': serializer.data['temp_min'],
        })
