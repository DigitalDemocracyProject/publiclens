import requests

def get_user_responses_by_survey_id():

    url = "http://localhost:8080/api/v1/user-response/get-by-survey-id/68e14b2cc5cf813189b25c86"

    try:
        response = requests.get(url, timeout=10)
        response.raise_for_status()
        return response.json()
    except requests.RequestException as e:
        raise Exception(f"Error fetching user responses by survey id: {e}")