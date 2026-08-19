from rest_framework import serializers

from .models import Lead


class LeadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lead
        fields = (
            "id",
            "name",
            "phone",
            "issue",
            "consent",
            "created_at",
        )
        read_only_fields = ("id", "created_at")

    def validate_name(self, value):
        value = value.strip()
        if len(value) < 2:
            raise serializers.ValidationError("Укажите имя не короче 2 символов.")
        return value

    def validate_phone(self, value):
        value = value.strip()
        digits = "".join(char for char in value if char.isdigit())
        if len(digits) < 10:
            raise serializers.ValidationError("Укажите корректный номер телефона.")
        return value

    def validate_consent(self, value):
        if not value:
            raise serializers.ValidationError(
                "Нужно согласие на обработку персональных данных."
            )
        return value