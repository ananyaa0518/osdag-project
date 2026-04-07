from django.db import models

class Location(models.Model):
    state = models.CharField(max_length=100)
    district = models.CharField(max_length=100)
    wind = models.FloatField()
    seismic_zone = models.CharField(max_length=20)
    zone_factor = models.FloatField()
    temp_max = models.FloatField()
    temp_min = models.FloatField()

    def __str__(self):
        return f"{self.district}, {self.state}"
