from django.contrib import admin

from .models import Lead


@admin.register(Lead)
class LeadAdmin(admin.ModelAdmin):
    list_display = ("name", "phone", "consent", "created_at")
    list_filter = ("consent", "created_at")
    search_fields = ("name", "phone", "issue")
    readonly_fields = ("created_at",)