import pandas as pd
from clients.survey_service_client import get_user_responses_by_survey_id

def analyze_survey_data():
    # Fetch external data
    data = get_user_responses_by_survey_id()

    # Convert to DataFrame
    df = pd.DataFrame(data)

    # Example analysis — summarize numeric columns
    summary = df.describe().to_dict()

    return summary