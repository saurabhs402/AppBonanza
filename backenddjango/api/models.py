from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db.models.signals import post_save

class User(AbstractUser):
    username = models.CharField(max_length=100)
    email = models.EmailField(unique=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']


    def profile(self):
        try:
            return self.userprofile
        except UserProfile.DoesNotExist:
            return None

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    image = models.ImageField(upload_to="user_images", default="default.jpg")
    points_earned = models.IntegerField(default=0)
    tasks_completed = models.IntegerField(default=0)
    # Add more profile fields as needed

    def __str__(self):
        return self.name



class Admin(models.Model):
    username = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=100,null=True)

    # Add more properties as needed

    def __str__(self):
        return self.username


class AndroidApp(models.Model):
    name = models.CharField(max_length=100)
    points_earned = models.IntegerField(default=0)
    image = models.ImageField(upload_to='android_apps/', null=True, blank=True)

    def __str__(self):
        return self.name

class File(models.Model):
    file = models.FileField(upload_to='uploads/')

    def __str__(self):
        return self.file

def create_user_profile(sender, instance, created, **kwargs):
    if created:
        UserProfile.objects.create(user=instance)

def save_user_profile(sender, instance, **kwargs):
    instance.userprofile.save()

post_save.connect(create_user_profile, sender=User)
# post_save.connect(save_user_profile, sender=User)


