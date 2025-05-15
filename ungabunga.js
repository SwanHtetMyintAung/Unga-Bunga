

function textElement(text){
    return document.createTextNode(text);
}

function bullet(name,...children){
    const currentElement = document.createElement(name);
    children.map((child) => {
        if(typeof(child) === "object"){
            currentElement.appendChild(child)
        }else if(typeof(child) === "string"){
            currentElement.appendChild(textElement(child))
        }
    })
    currentElement.addChip = function(name,value) {
        this.setAttribute(name,value);
        return this
    }
    currentElement.shoot = function(callback){
        this.onclick = callback;
        return this
    }
    return currentElement;
}

const casings = ['div', 'p', 'h1', 'h2', 'h3', 'span', 'a', 'ul', 'li', 'form', 'button', 'label', 'textarea'];
casings.map(shell => {
    window[shell] = (...children ) => bullet(shell,...children);
})
function input(type){
    return bullet("input").addChip("type",type)
}
function img(src){
    return bullet("img").addChip("src",src).addChip("alt",src)
}
const entry = document.getElementById("gate");


const router = (routes)=>{
    const routeContainer = document.querySelector(".router") || div().addChip("class","router");
    function magSwitch(){
        //www.example.com/index.html#route
        const url = window.location.href.split("#")[1] || "/";
        for(route of routes){
            const routeName = Object.keys(route)[0];
            if(url === routeName){
                if(routeContainer.hasChildNodes()){
                    routeContainer.removeChild(routeContainer.childNodes[0])            
                }
                routeContainer.appendChild(Object.values(route)[0]())
    
            }
        }

    }
    window.addEventListener("hashchange",magSwitch)
    
    magSwitch()
     

    routeContainer.refresh = () => magSwitch()


    return routeContainer;
}
function Arcane(){
    return div(p("This is arcane Page")).addChip("class","arcane")
}
function Wizard(){
    return div(p("This is Wizard Page")).addChip("class","wizard")
}
function Magic(){
    return div(p("This is Magic Page")).addChip("class","magic")
}
function SprayAndPray(counter){
    return div(h1("counter : " + counter)).addChip("class","home")
}

let counter = 0;

window.addEventListener("load",()=>{
    const r = router([{"/":()=>SprayAndPray(counter)},
        {"arcane":Arcane},
        {"wizard":Wizard},
        {"magic":Magic}
    ])
    entry.appendChild(div(
        a("Home").addChip("href","#"),
        a("arcane").addChip("href","#arcane"),
        a("wizard").addChip("href","#wizard"),
        a("magic").addChip("href","#magic"),    
        r,
        img("ungabunga.jpg").shoot(()=>{
            counter++;
            r.refresh()
        })
    ))
    
})