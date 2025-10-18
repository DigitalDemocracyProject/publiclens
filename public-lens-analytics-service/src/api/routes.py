import math
from fastapi import APIRouter
from fastapi.encoders import jsonable_encoder
from services.survey_analysis_service import analyze_survey_data

router = APIRouter()

def _sanitize(obj):

    """Recursively convert numpy / non-JSON floats and replace NaN/Inf with None."""
    if isinstance(obj, float):
        return obj if math.isfinite(obj) else None
    if isinstance(obj, dict):
        return {k: _sanitize(v) for k, v in obj.items()}
    if isinstance(obj, list):
        return [_sanitize(v) for v in obj]
    
    # Jsonable_encoder will already convert numpy scalars -> native types
    return obj

@router.get("/analyze")
def analyze_survey():

    """Fetch and analyze survey data."""
    result = analyze_survey_data()

    # First convert numpy/pydantic types to native Python types
    safe = jsonable_encoder(result)

    # Then replace NaN/Inf with None
    safe = _sanitize(safe)

    return safe