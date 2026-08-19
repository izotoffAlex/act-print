from django.db import models


class Lead(models.Model):
    name = models.CharField("Как к вам обращаться", max_length=120)
    phone = models.CharField("Телефон", max_length=30)
    issue = models.TextField("Что с принтером", blank=True)
    consent = models.BooleanField("Согласие на обработку данных")
    created_at = models.DateTimeField("Дата создания", auto_now_add=True)

    class Meta:
        verbose_name = "Заявка"
        verbose_name_plural = "Заявки"
        ordering = ("-created_at",)

    def __str__(self):
        return f"{self.name} — {self.phone}"