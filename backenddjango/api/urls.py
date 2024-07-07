from django.urls import path
from . import views

from rest_framework_simplejwt.views import (
TokenRefreshView,
)

urlpatterns = [
    path('token/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', views.RegisterView.as_view(), name='auth_register'),
    # path('test/', views.testEndPoint, name='test'),
    path('check-admin/', views.check_admin, name='test'),
    path('create_app/', views.create_android_app, name='create_android_app'),
    path('get_apps/', views.get_all_android_apps, name='get_all_android_apps'),
    path('user/profile/', views.get_user_profile, name='user-profile'),
    path('user/update/', views.user_update, name='user-update'),
    path('upload/', views.file_upload, name='file-upload'),
    path('auth/', views.get_auth, name='file-upload'),
    path('', views.getRoutes),
]