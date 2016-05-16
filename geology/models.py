# coding=iso-8859-1
from __future__ import unicode_literals
from django.contrib.gis.db import models


# This is an auto-generated Django model module created by ogrinspect.
class Unit(models.Model):
    name = models.CharField(max_length=1024)
    description = models.CharField(max_length=1024)
    timestamp = models.DateTimeField(null=True)
    begin = models.DateTimeField(null=True)
    end = models.DateTimeField(null=True)
    altitudemode = models.CharField(max_length=1024)
    tessellate = models.IntegerField()
    extrude = models.IntegerField()
    visibility = models.IntegerField()
    draworder = models.IntegerField()
    icon = models.CharField(max_length=1024)
    geom = models.GeometryField(srid=4326)

# Auto-generated `LayerMapping` dictionary for Unit model
unit_mapping = {
    'name': 'Name',
    'description': 'description',
    'timestamp': 'timestamp',
    'begin': 'begin',
    'end': 'end',
    'altitudemode': 'altitudeMode',
    'tessellate': 'tessellate',
    'extrude': 'extrude',
    'visibility': 'visibility',
    'draworder': 'drawOrder',
    'icon': 'icon',
    'geom': 'UNKNOWN',
}
