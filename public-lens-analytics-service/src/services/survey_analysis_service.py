import pandas as pd
from clients.survey_service_client import get_user_responses_by_survey_id

def analyze_survey_data():
    # Fetch external data
    data = get_user_responses_by_survey_id()
##
##    # Convert to DataFrame
##    df = pd.DataFrame(data)
##
##    # Example analysis — summarize numeric columns
##    summary = df.describe().to_dict()
##    #t_df = df.T
##    
##    #table = pd.crosstab()
##    #to see what current df looks like
##    #print(df)
##    #extract userAnswers
##    userAnswers = pd.DataFrame(df['userAnswers'])
##    #extract demographics as a series
##    demographics = df['demographics']
##    #print(demographics)
##    q_list = []
##    for i in range(len(userAnswers.columns)):
##        q_list.append(userAnswers.iloc[:, i])
##    #print(q_list)
##    for q in q_list:
##        print(q)
##        print(demographics)
##        print(pd.crosstab(demographics, q))
##    return summary
    processed_rows = []
    question_text_map = {} # To store question text for nice printing

    # 1. Flatten the data
    # Iterate through each user's response
    for response in data:
        row = {}
        
        # Combine demographics and userAnswers for processing
        all_questions = response.get('demographics', []) + response.get('userAnswers', [])
        
        for question in all_questions:
            q_id = question.get('questionId')
            q_text = question.get('text')
            
            # Store question text for later
            if q_id not in question_text_map:
                question_text_map[q_id] = q_text
            
            # Get the answer text (assuming radio/single answer)
            answers = question.get('answers', [])
            if answers:
                # Get the text from the first answer
                row[q_id] = answers[0].get('text')
            else:
                row[q_id] = None # Handle missing answers
        
        processed_rows.append(row)

    # 2. Create the flat DataFrame
    df = pd.DataFrame(processed_rows)

    # If the DataFrame is empty, exit
    if df.empty:
        return "Data was empty or could not be processed."

    # 3. Identify demographic and question columns dynamically
    demographic_cols = [col for col in df.columns if col.startswith('d')]
    question_cols = [col for col in df.columns if col.startswith('q')]

    #print("--- Survey Analysis: Crosstabs ---")
    analysis = []

    # 4. Loop through each survey question and crosstab against demographics
    for q_col in question_cols:
        #print(f"\n========================================================")
        sub_head = f"CROSSTABS FOR QUESTION: {question_text_map.get(q_col, q_col)}"
        #print(sub_head)
        #print(f"========================================================")
        tables = []
        for d_col in demographic_cols:
            title = f"{question_text_map.get(d_col, d_col)} (vs) {question_text_map.get(q_col, q_col)}"
            #print(f"\n### {title} ###\n")
            
            try:
                # Create the crosstab
                crosstab = pd.crosstab(df[d_col], df[q_col])
                #print(crosstab)
                table_data = {
                    "index": crosstab.index.tolist(),       # Row headers
                    "columns": crosstab.columns.tolist(), # Column headers
                    "data": crosstab.values.tolist()      # The data cells
                }
                tables.append({"subtitle": title,"table": table_data})
            except Exception as e:
                print(f"Could not generate crosstab for {d_col} vs {q_col}: {e}")
        analysis.append({"title": sub_head, "tables": tables})
    # Return a success message instead of the old 'summary'
    return analysis
