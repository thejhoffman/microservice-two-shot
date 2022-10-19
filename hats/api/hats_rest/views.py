# from django.http import JsonResponse
from django.views.decorators.http import require_http_methods

# import json

# import encoders
# import models


@require_http_methods(["GET", "POST"])
def api_hats(request):
    pass


@require_http_methods(["GET", "PUT", "DELETE"])
def api_hat(request, pk):
    pass
