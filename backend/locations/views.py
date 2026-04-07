from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Location
from .serializers import LocationDataSerializer

@api_view(['GET'])
def get_states(request):
    states = Location.objects.values_list('state', flat=True).distinct().order_by('state')
    return Response(list(states))

@api_view(['GET'])
def get_districts(request, state):
    districts = list(
        Location.objects.filter(state__iexact=state)
        .values_list('district', flat=True)
        .distinct()
        .order_by('district')
    )
    if not districts:
        return Response({'error': 'State not found or has no districts'}, status=status.HTTP_404_NOT_FOUND)
    return Response(districts)

@api_view(['GET'])
def get_location_data(request):
    state = (request.query_params.get('state') or '').strip()
    district = (request.query_params.get('district') or '').strip()
    
    if not state or not district:
        return Response({'error': 'State and district parameters are required'}, status=status.HTTP_400_BAD_REQUEST)

    location = Location.objects.filter(state__iexact=state, district__iexact=district).first()
    if not location:
        return Response({'error': 'Location not found'}, status=status.HTTP_404_NOT_FOUND)

    serializer = LocationDataSerializer(location)
    return Response(serializer.data)
