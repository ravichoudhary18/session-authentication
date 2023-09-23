from django.contrib.auth import authenticate
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from .serializers import LoginSerializer

class LoginAPIView(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            username = serializer.validated_data["username"]
            password = serializer.validated_data["password"]

            # Authenticate user
            user = authenticate(request, username=username, password=password)
            print(user)

            if user is not None:
                # User is authenticated, generate and return a token
                token, created = Token.objects.get_or_create(user=user)
                return Response({"token": token.key}, status=status.HTTP_200_OK)
            else:
                # Authentication failed
                return Response(
                    {"error": "Invalid credentials"},
                    status=status.HTTP_401_UNAUTHORIZED,
                )

        # Invalid input data
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
