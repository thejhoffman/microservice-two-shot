from django.http import JsonResponse
from .models import Shoe, BinVO
import json
from django.views.decorators.http import require_http_methods
from common.json import ModelEncoder


class BinVOEncoder(ModelEncoder):
    model = BinVO
    properties = ["closet_name", "import_href"]

class ShoeDetailEncoder(ModelEncoder):
    model = Shoe
    properties = [
        "manufacturer",
        "model_name",
        "color"
    ]
    encoders = {
        "bin": BinVOEncoder(),
    }


class ShoeListEncoder(ModelEncoder):
    model = Shoe
    properties =["id", "manufacturer", "model_name", "color"]


@require_http_methods(["GET", "POST"])
def api_list_shoes(request):
    if request.method == "GET":
        shoes = Shoe.objects.all()
        return JsonResponse(
            {"shoes": shoes},
            encoder=ShoeListEncoder,
            )
    else:
        content = json.loads(request.body)
        try:
            bin_href = content["bin"]
            bin = BinVO.objects.get(import_href=bin_href)
            content["bin"] = bin
        except BinVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid bin"},
                status=400,
            )
        shoe = Shoe.objects.create(**content)
        return JsonResponse(
            shoe,
            encoder = ShoeDetailEncoder,
            safe = False,
            )


@require_http_methods(["GET", "PUT", "DELETE"])
def api_show_shoe(request, pk):
    if request.method == "GET":
        shoes = Shoe.objects.get(id=pk)
        return JsonResponse(
            shoes,
            encoder=ShoeDetailEncoder,
            safe=False,
        )
    elif request.method == "DELETE":
        count, _ = Shoe.objects.filter(id=pk).delete()
        return JsonResponse({"deleted": count > 0})
    else:
        content = json.loads(request.body)
        try:
            bin = BinVO.objects.get(import_href=content["bin"])
            content["bin"] = bin
        except BinVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid bin"},
                status=400,
            )
        Shoe.objects.filter(id=pk).update(**content)
        shoe = Shoe.objects.get(id=pk)
        return JsonResponse(
            shoe,
            encoder=ShoeDetailEncoder,
            safe=False,
        )
