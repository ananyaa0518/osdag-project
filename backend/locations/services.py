from typing import List, Optional
from locations.models import Location
from django.db.models import QuerySet

def get_all_states() -> List[str]:
    """Fetch all unique states."""
    return list(Location.objects.values_list('state', flat=True).distinct().order_by('state'))

def get_districts_by_state(state: str) -> List[str]:
    """Fetch all unique districts for a given state."""
    return list(
        Location.objects.filter(state__iexact=state)
        .values_list('district', flat=True)
        .distinct()
        .order_by('district')
    )

def get_location_by_state_and_district(state: str, district: str) -> Optional[Location]:
    """Fetch location data for a given state and district."""
    return Location.objects.filter(state__iexact=state, district__iexact=district).first()
