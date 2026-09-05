from http.client import HTTPException
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
'''
Until the frontend is able to pass the survey_id, we will use a hardcoded value.
'''
@router.get("/analyze")
def analyze_survey():

    """Fetch and analyze survey data."""
    survey_id = "68e14b2cc5cf813189b25c86"
    result = analyze_survey_data(survey_id)

    # First convert numpy/pydantic types to native Python types
    safe = jsonable_encoder(result)

    # Then replace NaN/Inf with None
    safe = _sanitize(safe)

    return safe
'''
Once the frontend is able to pass the survey_id, we will use this endpoint instead of the one above.
@router.get("/analyze/{survey_id}")
def analyze_survey(survey_id: str):

    """Fetch and analyze survey data."""
    try:
        result = analyze_survey_data(survey_id)

        # First convert numpy/pydantic types to native Python types
        safe = jsonable_encoder(result)

        # Then replace NaN/Inf with None
        safe = _sanitize(safe)

        return safe
    except Exception as e:
        raise HTTPException(status_code=404, detail="Survey not found")
'''