import { useState } from 'react'
import RecipeChoices from './RecipeChoices'
import drinksJson from '../data/drinks.json'
import { useEffect } from 'react'
import { useRef } from 'react'

const ingredients = {
    temperature: ['hot', 'lukewarm', 'cold'],
    milk: ['cow', 'oat', 'goat', 'almond', 'none'],
    syrup: ['mocha','vanilla', 'toffee', 'maple', 'caramel', 'other', 'none'],
    blended: ['yes', 'turbo','no']
}

const ORDER_HEADING_TEXT = "Hi, I'd like to order a:"

const ResultEmoji = ({ result }) => {
    if (result === 'correct') return <span> ✅</span>
    if (result === 'wrong') return <span> ❌</span>
    return null
}

const BaristaForm = () => {

    const [typedHeading, setTypedHeading] = useState('')
    const [showDrink, setShowDrink] = useState(false)
    const typewriterIntervalRef = useRef(null)

    const playTypewriter = () => {
        clearInterval(typewriterIntervalRef.current)
        setTypedHeading('')
        setShowDrink(false)

        let charIndex = 0
        typewriterIntervalRef.current = setInterval(() => {
            charIndex += 1
            setTypedHeading(ORDER_HEADING_TEXT.slice(0, charIndex))
            if (charIndex >= ORDER_HEADING_TEXT.length) {
                clearInterval(typewriterIntervalRef.current)
                setShowDrink(true)
            }
        }, 60)
    }

    useEffect(() => {
        getNewDrink();
        playTypewriter();

        return () => clearInterval(typewriterIntervalRef.current)
    }, []);

    const [correct_temp, setCheckedTemperature] = useState('');
    const [correct_syrup, setCheckedSyrup] = useState('');
    const [correct_milk, setCheckedMilk] = useState('');
    const [correct_blended, setCheckedBlended] = useState('');
    const [currentDrink, setCurrentDrink] = useState('')
    const [trueRecipe, setTrueRecipe] = useState({})

    const [inputs, setInputs] = useState({
         'temperature': '',
         'milk': '',
         'syrup': '',
         'blended': ''
    })

    const getNewDrink = () => {
        let randomDrinkIndex = Math.floor(Math.random() * drinksJson.drinks.length);
        setCurrentDrink(drinksJson.drinks[randomDrinkIndex].name);
        setTrueRecipe(drinksJson.drinks[randomDrinkIndex].ingredients);
    }

    const onCheckAnswer = () => {

        const tempResult = trueRecipe.temp != inputs["temperature"] ? 'wrong' : 'correct'
        const milkResult = trueRecipe.milk != inputs["milk"] ? 'wrong' : 'correct'
        const syrupResult = trueRecipe.syrup != inputs["syrup"] ? 'wrong' : 'correct'
        const blendedResult = trueRecipe.blended != inputs["blended"] ? 'wrong' : 'correct'

        setCheckedTemperature(tempResult)
        setCheckedMilk(milkResult)
        setCheckedSyrup(syrupResult)
        setCheckedBlended(blendedResult)

        const allCorrect = [tempResult, milkResult, syrupResult, blendedResult].every(
            (result) => result === 'correct'
        )

        alert(allCorrect ? 'Correct! Not bad - let\'s keep it up!' : 'Wrong! Back to barista school!')
    }


    const onNewDrink = () => {
        setInputs({
            'temperature': '',
            'milk': '',
            'syrup': '',
            'blended': '' });

        getNewDrink();
        playTypewriter();
        setCheckedTemperature('');
        setCheckedSyrup('');
        setCheckedMilk('');
        setCheckedBlended('');
    }

    return (
        <div>
            <div className="newdrink-control">
                <button
                    className="button newdrink"
                    onClick={onNewDrink}
                    title="Get a new drink"
                    aria-label="Get a new drink"
                >
                    🔄
                </button>
                <span className="newdrink-label">New drink</span>
            </div>
            <h2 className="order-heading typewriter">{typedHeading}</h2>
            <div className={`drink-container ${showDrink ? 'visible' : ''}`}>
                <h2 className="mini-header">{currentDrink}</h2>
            </div>
            <form className="container">
            </form>

            <div className="categories-row">
            <div className="mini-container">
                <h3>Temperature</h3>
                <div className={`answer-space ${correct_temp}`} >
                  {inputs["temperature"]}<ResultEmoji result={correct_temp} />
                </div>
                <RecipeChoices
                    handleChange={(e) => 
                        setInputs((prevState) => ({
                            ...prevState,
                            [e.target.name]: e.target.value,
                        }))
                    }
                    label="temperature"
                    choices={ingredients["temperature"]}
                    checked={inputs["temperature"]}
                />
            </div>

            <div className="mini-container">
            <h3>Milk</h3>
            <div className={`answer-space ${correct_milk}`} >
              {inputs["milk"]}<ResultEmoji result={correct_milk} />
            </div>
            <RecipeChoices
                handleChange={(e) => 
                    setInputs((prevState) => ({
                        ...prevState,
                        [e.target.name]: e.target.value,
                    }))
                }
                label="milk"
                choices={ingredients["milk"]}
                checked={inputs["milk"]}
            />
            </div>

            <div className="mini-container">
                <h3>Syrup</h3>
                <div className={`answer-space ${correct_syrup}`} >
                  {inputs["syrup"]}<ResultEmoji result={correct_syrup} />
                </div>
                <RecipeChoices
                handleChange={(e) => 
                    setInputs((prevState) => ({
                        ...prevState,
                        [e.target.name]: e.target.value,
                    }))
                }
                label="syrup"
                choices={ingredients["syrup"]}
                checked={inputs["syrup"]}
                />
            </div>

            <div className="mini-container">
                <h3>Blended</h3>
                <div className={`answer-space ${correct_blended}`} >
                  {inputs["blended"]}<ResultEmoji result={correct_blended} />
                </div>
                <RecipeChoices
                    handleChange={(e) => 
                        setInputs((prevState) => ({
                            ...prevState,
                            [e.target.name]: e.target.value,
                        }))
                    }
                label="blended"
                choices={ingredients["blended"]}
                checked={inputs["blended"]}
                />
            </div>
            </div>
            <button className='button-submit' onClick={onCheckAnswer}>Check Answer</button>
        </div>
    )
}

export default BaristaForm