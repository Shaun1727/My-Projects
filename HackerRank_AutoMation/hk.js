const puppeteer=require("puppeteer");
const url="https://www.hackerrank.com/auth/login";
const email="shaun121@codecannon.com";
const password="Shaun123456st";
const codeObj=require('./code');
let browserOpen=puppeteer.launch({
    headless:false,
    args:['--start-maximized'],
    defaultViewport:null
})
let page;
browserOpen.then(function(browserObj){
    let BrowserOpenPromise=browserObj.newPage();
    return BrowserOpenPromise;
}).then(function(newTab){
    page=newTab;
    let hackerrankOpenPromise=page.goto(url);
    return hackerrankOpenPromise;
}).then(function(){
    let emailEntered=page.type("input[id='input-1']",email,{delay:20});
    return emailEntered;
}).then(function(){
    let passwordEntered=page.type("input[type='password']",password,{delay:20});
    return passwordEntered;
}).then(function(){
    let loginButtonClick=page.click("button[type='submit']",{delay:15});
    return loginButtonClick;
}).then(function(){
    let clickOnAlgoPromise=waitAndClick(".topic-card a[data-attr1='algorithms']",page);
    return clickOnAlgoPromise;
}).then(function(){
    let getToWarmUp=waitAndClick("input[value='warmup']",page);
    return getToWarmUp;
}).then(function(){
    let waitfor3seconds=page.waitFor(3000);
    return waitfor3seconds;
}).then(function(){
    let allQuestionsPromise=page.$$(".ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled",{delay:30});
    return allQuestionsPromise;
}).then(function(QuestionsArr){
    console.log("number of questions",QuestionsArr.length);
    let QuestionWillBeSolved=QuestionSolver(page,QuestionsArr[0],codeObj.answers[0]);
    return QuestionWillBeSolved;
})

function waitAndClick(selector,cPage){
    return new Promise(function(resolve,reject){
     let waitForModelPromise=cPage.waitForSelector(selector);
     waitForModelPromise.then(function(){
         let clickModel=cPage.click(selector);
         return clickModel;
     }).then(function(){
       resolve();
     }).catch(function(err){
         reject(); 
     })
    })
}

function QuestionSolver(page,question,answer){
    return new Promise(function(resolve,reject){
        let QuestionWillBeClicked=question.click();
         QuestionWillBeClicked.then(function(){
             let EditorInFocusPromise=waitAndClick('.monaco-editor.no-user-select.vs',page);
             return EditorInFocusPromise;
         }).then(function(){
             return waitAndClick(".checkbox-input",page);
         }).then(function(){
             return page.waitForSelector("textarea.custominput",page);
         }).then(function(){
             return page.type("textarea.custominput",answer,{delay:10});
         }).then(function(){
             let crtlIsPressed=page.keyboard.down('Control');
             return crtlIsPressed;
         }).then(function(){
             let AisPressed=page.keyboard.press("A",{delay:100});
             return AisPressed;
         }).then(function(){
             let XisPressed=page.keyboard.press("X");
             return XisPressed;
         }).then(function(){
             let ctrlisUnpressed=page.keyboard.up("Control");
         }).then(function(){
             let mainEditorInFocusPromise=waitAndClick('.monaco-editor.no-user-select.vs',page);
             return mainEditorInFocusPromise;
         }).then(function(){
            let crtlIsPressed=page.keyboard.down('Control');
            return crtlIsPressed;
         }).then(function(){
            let AisPressed=page.keyboard.press("A",{delay:100});
            return AisPressed;
         }).then(function(){
            let VisPressed=page.keyboard.press("V",{delay:100});
            return VisPressed;
         }).then(function(){
            let ctrlisUnpressed=page.keyboard.up("Control");
        }).then(function(){
            return page.click(".hr-monaco__run-code",{delay:30});
        }).then(function(){
            resolve();
        }).catch(function(err){
            reject();
        })
    })
}