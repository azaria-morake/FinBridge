from rest_framework import serializers
from .models import CustomUser

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'})

    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'company_name', 'position', 'location', 'needs', 'profile_picture', 'password']
        extra_kwargs = {'password': {'write_only': True}}  # Ensure password isn't returned in responses

    def create(self, validated_data):
        # Ensure password is present in validated_data
        password = validated_data.pop('password')
        user = CustomUser(**validated_data)
        user.set_password(password)  # Ensure the password is hashed
        user.save()
        return user
