// Idendifiers of HTML elements

export const State_button = Object.freeze({ 
    None: 0, 
    Check: 2, 
    Cross: 1,
    Cross_Disable: 3  
}); 
let movie_aux=[]
export const Monitor=["130", "150", "156", "215", "270"]
export const Monitor_index={"130":0, "150":1, "156":2, "215":3, "270":4}
export const Processor=["20", "23", "25","27", "31"]
export const Hard_disk=["250","320","500","750","1024"]
export const  Price =["699","999","1149","1349","1649"]
export const type_computer={"Monitor":Monitor,"Processor":Processor,"Hard_disk":Hard_disk,"Price":Price}
export const  type_index_computer=["Processor","Hard_disk","Price","Choice"]

let dic={}
for(let i =0;i<5;++i)
{
    let aux={}
    for(let j =0;j<3;++j)
    {
        aux[type_index_computer[j]]={}
        for(let k =0;k<5;++k)
        {
            aux[type_index_computer[j]][type_computer[type_index_computer[j]][k]]=State_button.None
        }   
    }
    aux[type_index_computer[3]]=State_button.None
    dic[type_computer.Monitor[i]]=aux
}


export const computer =dic