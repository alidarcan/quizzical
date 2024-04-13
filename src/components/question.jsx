import PropTypes from "prop-types"
export default function Question(props){

    const {value} = props
    return(
        <div>
            <h2 className="question">Question Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati, non inventore autem sequi nostrum, molestias corrupti, facilis vitae exercitationem veniam cum? Obcaecati voluptates eius sunt dolores itaque totam nobis ducimus!</h2>
            <div className="input-group">
                {/* {questions} */}
                <input type="radio" name={`question${value}`} id={`question${value}answer1`} />
                <label htmlFor={`question${value}answer1`}>Answer 1</label>
                <input type="radio" name={`question${value}`} id={`question${value}answer2`} />
                <label htmlFor={`question${value}answer2`}>Answer 2</label>
                <input type="radio" name={`question${value}`} id={`question${value}answer3`} />
                <label htmlFor={`question${value}answer3`}>Answer 3</label>
                <input type="radio" name={`question${value}`} id={`question${value}answer4`} />
                <label htmlFor={`question${value}answer4`}>Answer 4</label>
            </div>
            <hr />
        </div>
    )
}
Question.propTypes = {
    value: PropTypes.number
}