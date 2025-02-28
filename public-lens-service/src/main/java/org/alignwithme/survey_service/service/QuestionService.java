package org.alignwithme.survey_service.service;

import org.alignwithme.survey_service.entity.Question;
import org.alignwithme.survey_service.repository.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class QuestionService {

    @Autowired
    private final QuestionRepository questionRepository;

    @Autowired
    public QuestionService(QuestionRepository questionRepository) {
        this.questionRepository = questionRepository;
    }

    public Question createQuestion(Question question) {
        return questionRepository.save(question);
    }

    public List<Question> getAllQuestions() {
        return questionRepository.findAll();
    }

    public Question getQuestionById(String questionId) {
        return questionRepository.findById(questionId).orElse(null);
    }

    public Question updateQuestion(String questionId, Question updatedQuestion) {
        if (questionRepository.existsById(questionId)) {
            updatedQuestion.setQuestionId(questionId);
            return questionRepository.save(updatedQuestion);
        }
        return null;
    }

    public void deleteQuestion(String questionId) {
        questionRepository.deleteById(questionId);
    }
}
