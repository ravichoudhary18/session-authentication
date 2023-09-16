from rest_framework import serializers
from django.contrib.auth.models import User


class LoginSerializer(serializers.ModelSerializer):
    username = serializers.CharField(max_length=255)
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        username = data.get("username")
        password = data.get("password")

        if username and password:
            return data
        else:
            raise serializers.ValidationError("Both username and password are required.")

    class Meta:
        model = User
        fields = ('username', 'password')