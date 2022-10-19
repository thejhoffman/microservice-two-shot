from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json

from common.json import ModelEncoder
from .models import Hat, LocationVO


class LocationVOEncoder(ModelEncoder):
    model = LocationVO
    properties = [
        "name",
        "import_href",
    ]


class HatListEncoder(ModelEncoder):
    model = Hat
    properties = [
        "style_name",
        "location",
    ]
    encoders = {
        "location": LocationVOEncoder(),
    }


class HatDetailEncoder(ModelEncoder):
    model = Hat
    properties = [
        "style_name",
        "fabric",
        "color",
        "picture_url",
        "location",
    ]
    encoders = {
        "location": LocationVOEncoder(),
    }


@require_http_methods(["GET", "POST"])
def api_hats(request):
    if request.method == "GET":
        hats = Hat.objects.all()
        return JsonResponse(
            {"hats": hats},
            encoder=HatListEncoder,
        )
    else:
        try:
            content = json.loads(request.body)
            location_href = content["location"]
            content["location"] = LocationVO.objects.get(import_href=location_href)
            hat = Hat.objects.create(**content)
        except LocationVO.DoesNotExist:
            response = JsonResponse({"message": "Location does not exist"})
            response.status_code = 404
            return response
        return JsonResponse(
            hat,
            encoder=HatDetailEncoder,
            safe=False,
        )


@require_http_methods(["GET", "PUT", "DELETE"])
def api_hat(request, pk):
    if request.method == "GET":
        try:
            hat = Hat.objects.get(id=pk)
            return JsonResponse(
                hat,
                encoder=HatDetailEncoder,
                safe=False,
            )
        except Hat.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response
    elif request.method == "DELETE":
        try:
            hat = Hat.objects.get(id=pk)
            hat.delete()
            return JsonResponse(
                hat,
                encoder=HatDetailEncoder,
                safe=False,
            )
        except Hat.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response
    else:  # PUT
        try:
            content = json.loads(request.body)
            hat = Hat.objects.get(id=pk)

            props = ["style_name", "fabric", "color", "location"]
            for prop in props:
                if prop in content:
                    if prop == "location":
                        location = LocationVO.objects.get(
                            import_href=content["location"]
                        )
                        setattr(hat, prop, location)
                    else:
                        setattr(hat, prop, content[prop])
            hat.save()
            return JsonResponse(
                hat,
                encoder=HatDetailEncoder,
                safe=False,
            )
        except Hat.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response
        except LocationVO.DoesNotExist:
            response = JsonResponse({"message": "Location does not exist"})
            response.status_code = 404
            return response
