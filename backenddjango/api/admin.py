from django.contrib import admin
from .models import User, UserProfile, AndroidApp, Admin

class UserAdmin(admin.ModelAdmin):
    list_display = ['username', 'email']
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ['name', 'user', 'points_earned', 'tasks_completed']  # Customize the displayed fields as needed

class AdminProfile(admin.ModelAdmin):
    list_display = ['username', 'email']

class AndroidAppView(admin.ModelAdmin):
    list_display = ['name', 'points_earned','image']

# Register your models here.

admin.site.register(User,UserAdmin)
admin.site.register(UserProfile,UserProfileAdmin)
admin.site.register(AndroidApp,AndroidAppView)
admin.site.register(Admin,AdminProfile)



