
import FeedbackSection from "../../src/components/feedback-section/feedbackSection";
import FeedbackInputSection from "../../src/components/feedback-section/feedbackInputSection";
import FeedbackCard from "../../src/components/feedback-section/feedbackCard";

const mock_id = "mock-id"
const mock_rel_feedbacks = [
  {
    firstName: "mock-name",
    internshipId: mock_id,
    lastName: "mock-surname",
    postedAt: "mock-date",
    ratingOutOfFive: "5",
    text: "mock-text",
    __v: 0,
    _id: "mock-id"
  },
  {
    firstName: "mock-name",
    internshipId: mock_id,
    lastName: "mock-surname",
    postedAt: "mock-date",
    ratingOutOfFive: "2",
    text: "mock-text",
    __v: 0,
    _id: "mock-id"
  }
]

describe('feedback.cy.js', () => {
  it('feedbacSection test', () => {
    //cy.visit('https://dtu.praktikportal.diplomportal.dk')
    cy.mount(<FeedbackSection />)
  
    cy.get('h2.feedback-header')
      .should('be.visible');
  })


  it('feedbackInputSection avg-rating test', () => {
    const expected = 3.5

    cy.mount(<FeedbackInputSection internshipId={mock_id} feedbacks={mock_rel_feedbacks}/>)
    cy.get('[id^=avgRating]')
      .should('have.text', expected)
  })


  it('feedbackCard test', () => {
    cy.mount(mock_rel_feedbacks.map((el) => (
                <FeedbackCard data={el} />
              ))
            )
    cy.get('[class=feedbackCard]')
      .should('have.length', 2)
    cy.get('span.rating')
      .should('be.visible')
  })

})