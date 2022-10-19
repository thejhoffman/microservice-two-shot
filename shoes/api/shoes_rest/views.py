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
    properties =["model_name", "color"]


@require_http_methods(["GET", "POST"])
def api_list_shoes(request):
    if request.method == "GET":
            shoes = Shoe.objects.all()
            return JsonResponse(
                { "shoes":shoes},
                encoder=ShoeListEncoder
                )
