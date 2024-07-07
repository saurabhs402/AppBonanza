from django.shortcuts import render
from django.http import JsonResponse
from django.conf import settings
from api.models import User, Admin, AndroidApp, UserProfile


from api.serializer import MyTokenObtainPairSerializer, RegisterSerializer, AndroidAppSerializer, UserSerializer, UserProfileSerializer, FileSerializer

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from django.core.files.uploadedfile import InMemoryUploadedFile


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer




# Get All Routes

@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/token/',
        '/api/register/',
        '/api/token/refresh/'
    ]
    return Response(routes)


# @api_view(['GET', 'POST'])
# @permission_classes([IsAuthenticated])
# def testEndPoint(request):
#     if request.method == 'GET':
#         data = f"Congratulation {request.user}, your API just responded to GET request"
#         return Response({'response': data}, status=status.HTTP_200_OK)
#     elif request.method == 'POST':
#         text = "Hello buddy"
#         data = f'Congratulation your API just responded to POST request with text: {text}'
#         return Response({'response': data}, status=status.HTTP_200_OK)
#     return Response({}, status.HTTP_400_BAD_REQUEST)



@api_view(['POST'])
def check_admin(request):
    email = request.data.get('email')
    password = request.data.get('password')

    
    try:
        # Retrieve the admin based on the provided email
        admin = Admin.objects.get(email=email)
        
        # Check if the provided password matches the admin's password
        if admin.password==password:
            return Response({'is_admin': True},status=status.HTTP_200_OK)
        else:
            return Response({'is_admin': False},status=status.HTTP_400_BAD_REQUEST)
    except Admin.DoesNotExist:
        return Response({'is_admin': False},status=status.HTTP_400_BAD_REQUEST)



@api_view(['POST'])
def create_android_app(request):
    request.data['points_earned'] = int(request.data.get('points_earned', 0))
    serializer = AndroidAppSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_all_android_apps(request):
    apps = AndroidApp.objects.all()
    serializer = AndroidAppSerializer(apps, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_profile(request):
    try:
        # Retrieve the user profile associated with the current user
        user_profile = UserProfile.objects.get(user=request.user)
        # Serialize the user profile data along with user data
        serializer = UserSerializer(user_profile.user)
        # Include additional user profile fields if needed
        serialized_data = serializer.data
        serialized_data.update({
            'name': user_profile.name,
            'points_earned': user_profile.points_earned,
            'tasks_completed': user_profile.tasks_completed,
        })
        return Response(serialized_data, status=status.HTTP_200_OK)
    except UserProfile.DoesNotExist:
        return Response({'error': 'User profile does not exist'}, status=status.HTTP_404_NOT_FOUND)



@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def user_update(request):
        request.data['points_earned'] = int(request.data.get('points_earned', 0))
        request.data['tasks_completed'] = int(request.data.get('tasks_completed', 0))
        user_profile = request.user.userprofile
        if user_profile:
            serializer = UserProfileSerializer(user_profile, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response("User profile not found", status=status.HTTP_404_NOT_FOUND)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def file_upload(request):
        file_serializer = FileSerializer(data=request.data)
        if file_serializer.is_valid():
            file_serializer.save()
            return Response(file_serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(file_serializer.errors, status=status.HTTP_400_BAD_REQUEST)



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_auth(request):
    return Response(status=status.HTTP_200_OK)