from django.db import models
from django.urls import reverse


class LocationVO(models.Model):
    import_href = models.CharField(max_length=200, unique=True)
    name = models.CharField(max_length=100)


class Hat(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    location = models.ForeignKey(
        LocationVO,
        related_name="hats",
        on_delete=models.CASCADE,
    )

    def get_api_url(self):
        return reverse("api_hat", kwargs={"pk": self.pk})
