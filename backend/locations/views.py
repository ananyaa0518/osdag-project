from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from . import services
from .serializers import LocationDataSerializer

@api_view(['GET'])
def get_states(request):
    states = services.get_all_states()
    return Response(states, status=status.HTTP_200_OK)

@api_view(['GET'])
def get_districts(request, state):
    districts = services.get_districts_by_state(state)
    
    if not districts:
        return Response(
            {'error': 'State not found or has no districts'}, 
            status=status.HTTP_404_NOT_FOUND
        )
    return Response(districts, status=status.HTTP_200_OK)

@api_view(['GET'])
def get_location_data(request):
    state = (request.query_params.get('state') or '').strip()
    district = (request.query_params.get('district') or '').strip()
    
    if not state or not district:
        return Response(
            {'error': 'State and district parameters are required'}, 
            status=status.HTTP_400_BAD_REQUEST
        )

    location = services.get_location_by_state_and_district(state, district)
    
    if not location:
        return Response(
            {'error': 'Location not found'}, 
            status=status.HTTP_404_NOT_FOUND
        )

    serializer = LocationDataSerializer(location)
    return Response(serializer.data, status=status.HTTP_200_OK)
