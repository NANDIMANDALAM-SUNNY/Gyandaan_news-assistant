import React ,{useState,useEffect} from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';
import NewsCards from './components/NewsCards/NewsCards';
import useStyles from './style.js'
import wordsToNumbers from 'words-to-numbers'
// import mainlogo from './gyandaanlogo.jpeg';
const alankey='469a4950ab31e931e806638d072b42fe2e956eca572e1d8b807a3e2338fdd0dc/stage'
const App = () => {
    const [newsArticles, setNewsArticles] = useState([]);
    const classes = useStyles();
    const [activeArticle, setActiveArticle] = useState(-1);
    useEffect(()=>{
        alanBtn({
            key:alankey,
            onCommand:({command,articles,number})=>{
                if(command==='newHeadlines'){
                    setNewsArticles(articles);
                    setActiveArticle(-1);
                }else if(command ==='highlight'){
                    setActiveArticle((prevActiveArticle)=>prevActiveArticle+1);
                }
                else if(command==='open'){
                    const parsedNumber = number.length > 2 ? wordsToNumbers((number), { fuzzy: true }) : number;
                    const article = articles[parsedNumber-1];
                    if (parsedNumber > articles.length) {
                        alanBtn().playText('Please try that again...');
                      } else if (article) {
                        window.open(article.url, '_blank');
                        alanBtn().playText('Opening...');
                      } else {
                        alanBtn().playText('Please try that again...');
                      }
                   
                }
            }
        })
    },[])
    return (
        <div>
            <div className={classes.imageConatiner}>
                <img src="https://discussions.gyandhan.com/uploads/default/original/1X/8b437f68be951cc9cc8a44a0f69943f2301ceee1.png" className={classes.alanLogo} alt='error'/>
            </div>
            <NewsCards articles={newsArticles} activeArticle={activeArticle} />
        </div>
    );
}

export default App
