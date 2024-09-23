from django.contrib.auth.models import AbstractUser, Group, Permission
from django.db import models

class User(AbstractUser):
    company_name = models.CharField(max_length=100)
    position = models.CharField(max_length=100)
    company_location = models.CharField(max_length=100, blank=True)
    needs_problems = models.TextField()
    profile_picture = models.ImageField(upload_to='profile_pictures/', blank=True, null=True)
    
    # Add related_name to avoid reverse accessor clashes
    groups = models.ManyToManyField(Group, related_name='custom_user_groups', blank=True)
    user_permissions = models.ManyToManyField(Permission, related_name='custom_user_permissions', blank=True)

    def __str__(self):
        return self.username
