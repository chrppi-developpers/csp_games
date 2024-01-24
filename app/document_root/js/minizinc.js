import { Model } from 'https://cdn.jsdelivr.net/npm/minizinc/dist/minizinc.mjs';
import {id} from './id.js';
import {movie,Personne,Film,Day,Time,type,type_index,State_button,Time_value} from './donne_minijeu/movie_table.js';
import {Monitor,Processor,Hard_disk,Price,type_computer,type_index_computer,computer,Monitor_index} from './donne_minijeu/computer_table.js';
import {State_liste,Women,Shirt,Name,Surname,Pasta,type_pasta,pasta,Nom_afficher_pasta} from './donne_minijeu/Pasta_table.js';


async function solve(model_file,contraintes="",id_tableau)
{
	let solution_div=0
	let solution_notification=0
	
	switch (id_tableau) {
		case id.id_table_movie:
		{
			solution_div=document.getElementById(id.id_solution_div_movie)
			solution_notification=document.getElementById(id.id_solution_notification_movie)
		}
		break;

		case id.id_table_computer:
		{
			solution_div=document.getElementById(id.id_solution_div_computer)
			solution_notification=document.getElementById(id.id_solution_notification_computer)
		}
		break;
		case id.id_table_pasta:
		{
			solution_div=document.getElementById(id.id_solution_div_pasta)
			solution_notification=document.getElementById(id.id_solution_notification_pasta)
		}
		break;
	}
	solution_notification.classList.add("is-warning")
	solution_notification.classList.remove("is-danger")
	solution_notification.classList.remove("is-success")
	let p =document.createElement("p")
	p.classList.add("is-size-5")
	p.classList.add("has-text-centered")
	p.textContent="Solution is calculating"
	solution_div.classList.remove("is-hidden")
	while(solution_notification.firstChild)
	{
		solution_notification.removeChild(solution_notification.firstChild)
	}
	solution_notification.appendChild(p)
	// Define model
	const model = new Model();

	// Load model
	const response = await fetch('mzn/' + model_file);
	//ajouter le response texte
	let csp = await response.text();
	csp+=contraintes
	//console.log(csp)
	model.addFile('test.mzn', csp);

	// Solve model
	//const solve = model.solve({options: {solver: 'gecode', 'all-solutions': true, 'intermediate-solutions': false, 'num-solutions': 2}});
	
	
	const solve = model.solve({options: {solver: 'gecode'}});
	// Print solutions
	//solve.on('solution', solution => {console.log(model_file, ': ', solution.output.json);});
	solve.then(result => {
		let solution_div=0
		let solution_notification=0
		
		switch (id_tableau) {
			case id.id_table_movie:
			{
				solution_div=document.getElementById(id.id_solution_div_movie)
				solution_notification=document.getElementById(id.id_solution_notification_movie)
			}
			break;
			case id.id_table_computer:
			{
				solution_div=document.getElementById(id.id_solution_div_computer)
				solution_notification=document.getElementById(id.id_solution_notification_computer)
			}
			break;
			case id.id_table_pasta:
			{
				solution_div=document.getElementById(id.id_solution_div_pasta)
				solution_notification=document.getElementById(id.id_solution_notification_pasta)
			}
			break;
		}
		while(solution_notification.firstChild)
		{
			solution_notification.removeChild(solution_notification.firstChild)
		}
		//console.log(model_file, ': ', result.status);
		if(result.status=="ALL_SOLUTIONS" || result.status=="OPTIMAL_SOLUTION" || result.status=="SATISFIED")
		{
			solution_notification.classList.remove("is-warning")
			solution_notification.classList.remove("is-danger")
			solution_notification.classList.add("is-success")
			let p =document.createElement("p")
			p.classList.add("is-size-5")
			p.classList.add("has-text-centered")
			
			p.textContent="Your proposition has solution"
			solution_notification.appendChild(p)
		}else{
			solution_notification.classList.remove("is-warning")
			solution_notification.classList.add("is-danger")
			solution_notification.classList.remove("is-success")
			let p =document.createElement("p")
			p.classList.add("is-size-5")
			p.classList.add("has-text-centered")
			p.textContent="Your proposition has no solution"
			solution_notification.appendChild(p)
		}
		//sleep_iden(solution_div)		
	});

	
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function sleep_iden(solution_div)
{
	await sleep(15000);
	solution_div.classList.add("is-hidden")
}

function charge_donne_tableau(id_tableau)
{
	switch(id_tableau)
	{
		case id.id_table_movie :
		{
			let data=JSON.parse(sessionStorage.getItem(id.session_movie_data))
			let tds=document.getElementById(id.id_table_movie).getElementsByTagName("td")
			for (let td of tds) 
			{	
				let x=td.cellIndex
				let y=td.parentNode.rowIndex
				 
				if(y==2)
				{
					x-=1
				}
				y-=2
				x-=1
				
				
				while(td.firstChild)
				{
					td.removeChild(td.firstChild)
				}
				let icone=""
				let disable=false;
				switch(data[Personne[y]][type_index[parseInt(x/5)]][type[type_index[parseInt(x/5)]][x%5]])
				{
					case State_button.Check:
					{
						icone=id.icone_path+"approuve.png"
					}break;
					case State_button.Cross:
					{
						icone=id.icone_path+"traverser.png"
					}break;
					case State_button.Cross_Disable:
					{
						icone=id.icone_path+"traverser.png"
						disable=true
					}break;
				}
				if(icone!="")
				{
					let figure=document.createElement("figure")
					if(disable)
					{
						figure.setAttribute("disabled","true")
					}
					figure.classList.add("image")
					figure.classList.add("is-1by1")

					let img=document.createElement("img")
					//img.classList.add("is-rounded")
					img.setAttribute("src",icone)
					figure
					
					figure.appendChild(img)
					
					td.appendChild(figure)
					figure.addEventListener("click",(e)=>{
						e.target.parentNode.parentNode.click()
					})
					//td.addEventListener("click",click_table)
				}
			}
			
		}break;
		case id.id_table_computer :
		{
			let data=JSON.parse(sessionStorage.getItem(id.session_computer_data))
			let tds=document.getElementById(id.id_table_computer).getElementsByTagName("td")
			for (let td of tds) 
			{	
				let x=td.cellIndex
				let y=td.parentNode.rowIndex
				 
				if(y==2)
				{
					x-=1
				}
				y-=2
				x-=1
				
				
				while(td.firstChild)
				{
					td.removeChild(td.firstChild)
				}
				let icone=""
				let disable=false;
				let state=""
				if(x==15)
				{
					state=data[Monitor[y]][type_index_computer[3]]
				}else{
					state=data[Monitor[y]][type_index_computer[parseInt(x/5)]][type_computer[type_index_computer[parseInt(x/5)]][x%5]]
				}
				switch(state)
				{
					case State_button.Check:
					{
						icone=id.icone_path+"approuve.png"
					}break;
					case State_button.Cross:
					{
						icone=id.icone_path+"traverser.png"
					}break;
					case State_button.Cross_Disable:
					{
						icone=id.icone_path+"traverser.png"
						disable=true
					}break;
				}
				if(icone!="")
				{
					let figure=document.createElement("figure")
					if(disable)
					{
						figure.setAttribute("disabled","true")
					}
					figure.classList.add("image")
					figure.classList.add("is-1by1")

					let img=document.createElement("img")
					//img.classList.add("is-rounded")
					img.setAttribute("src",icone)
					figure
					
					figure.appendChild(img)
					
					td.appendChild(figure)
					figure.addEventListener("click",(e)=>{
						e.target.parentNode.parentNode.click()
					})
					//td.addEventListener("click",click_table)
				}
			}
			
		}break;

		case id.id_table_pasta:
		{
			let data =JSON.parse( sessionStorage.getItem(id.session_pasta_data))
			let selects=document.getElementById(id.id_table_pasta).getElementsByTagName("select")
			
			for (let select of selects) 
			{	
				let x=select.parentNode.parentNode.cellIndex
				let y=select.parentNode.parentNode.parentNode.rowIndex


				x-=1
				y-=1

				while(select.firstChild)
				{
					select.removeChild(select.firstChild)
				}
				let selected=false
				Object.keys(data[x][y]).forEach(value=>{
					let option=document.createElement("option")
					switch (data[x][y][value]) {
						case State_liste.Check:
						{
							//option.classList.add("has-background-success")
							option.setAttribute("selected","true")
							selected=true
						}	
						break;
						case State_liste.Disable:
						{
							option.setAttribute("disabled","true")
						}	
						break;
					}
					
					option.textContent=Nom_afficher_pasta[value]
					select.appendChild(option)
				})
				
				let option=document.createElement("option")
				if(!selected)
				{
					option.setAttribute("selected","true")	
				}
				select.appendChild(option)
				
			}
		}break;
	}
}

function changement_tab(id_a_changer)
{
	document.getElementById(id.tabs_movie_buffs).classList.remove("is-active")
	document.getElementById(id.tabs_new_computer ).classList.remove("is-active")
	document.getElementById(id.tabs_pasta_wine).classList.remove("is-active")
	document.getElementById(id.tabs_creation_puzzle).classList.remove("is-active")
	
	document.getElementById(id_a_changer).classList.add("is-active")
	load_puzzle(id_a_changer)
	sessionStorage.setItem(id.id_tab_save,id_a_changer)
	
}

function load_puzzle(id_puzzle)
{
	document.getElementById(id.div_pasta_wine).classList.remove("is-hidden")
	document.getElementById(id.div_new_computer).classList.remove("is-hidden")
	document.getElementById(id.div_movie_buffs).classList.remove("is-hidden")
	document.getElementById(id.div_creation_puzzle).classList.remove("is-hidden")
	switch(id_puzzle)
	{
		case id.tabs_movie_buffs:
		{
			document.getElementById(id.div_pasta_wine).classList.add("is-hidden")
			document.getElementById(id.div_new_computer).classList.add("is-hidden")
			document.getElementById(id.div_creation_puzzle).classList.add("is-hidden")
		}break;
		case id.tabs_new_computer:
		{
			document.getElementById(id.div_pasta_wine).classList.add("is-hidden")
			document.getElementById(id.div_movie_buffs).classList.add("is-hidden")
			document.getElementById(id.div_creation_puzzle).classList.add("is-hidden")
		}break;
		case id.tabs_pasta_wine:
		{
			document.getElementById(id.div_movie_buffs).classList.add("is-hidden")
			document.getElementById(id.div_new_computer).classList.add("is-hidden")
			document.getElementById(id.div_creation_puzzle).classList.add("is-hidden")
		}break;
		case id.tabs_creation_puzzle:
		{
			document.getElementById(id.div_movie_buffs).classList.add("is-hidden")
			document.getElementById(id.div_new_computer).classList.add("is-hidden")
			document.getElementById(id.div_pasta_wine).classList.add("is-hidden")
		}break;
	}
}

function check_information(id_tableau)
{

	switch (id_tableau) {
		case id.id_table_movie:
		{
			let data=JSON.parse(sessionStorage.getItem(id.session_movie_data))
			let constraints=""
			Object.keys(data).forEach(function(Nom) {
				Object.keys(data[Nom]).forEach(function(type) {
					Object.keys(data[Nom][type]).forEach(function(value) {
						
						
						switch (type) {
							//Film
							case type_index[0]:
							{
								switch (data[Nom][type][value]) {
									case State_button.Check:
									{
										let constraint=`
										constraint exists(releases_indexe in releases_indexes)
										(
											name_releases[releases_indexe] = `+Nom+`
											/\\ film_indexes[film_name_values[releases_indexe]] = `+ value+`
										);
										`
										//console.log(constraint)
										constraints+=constraint
									}break;
									case State_button.Cross:
									case State_button.Cross_Disable:
									{
										let constraint=`
										constraint exists(releases_indexe in releases_indexes)
										(
											name_releases[releases_indexe] != `+Nom+`
											\\/ film_indexes[film_name_values[releases_indexe]] != `+value+`
										);
										`
										constraints+=constraint
									}break;	
								}
							}break;
							//Day
							case type_index[1]:
							{
								switch (data[Nom][type][value]) {
									case State_button.Check:
									{
										let constraint=`
										constraint exists(releases_indexe in releases_indexes)
										(
											name_releases[releases_indexe] = `+Nom+`
											/\\ day_indexes[day_name_values[releases_indexe]] = `+ value+`
										);
										`
										//console.log(constraint)
										constraints+=constraint
									}break;
									case State_button.Cross:
									case State_button.Cross_Disable:
									{
										let constraint=`
										constraint exists(releases_indexe in releases_indexes)
										(
											name_releases[releases_indexe] != `+Nom+`
											\\/ day_indexes[day_name_values[releases_indexe]] != `+value+`
										);
												`
										constraints+=constraint
									}break;	
								}
							}break;
							//Time
							case type_index[2]:
							{
								switch (data[Nom][type][value]) {
									case State_button.Check:
									{
										let constraint=`
										constraint exists(releases_indexe in releases_indexes)
										(
											name_releases[releases_indexe] = `+Nom+`
											/\\ time_indexes[time_values[releases_indexe]] = time(`+Time_value[value][0]+`,` +Time_value[value][1]+`)
										);
										`
										constraints+=constraint
									}break;
									case State_button.Cross:
									case State_button.Cross_Disable:
									{
										let constraint=`
										constraint exists(releases_indexe in releases_indexes)
										(
											name_releases[releases_indexe] != `+Nom+`
											\\/ time_indexes[time_values[releases_indexe]] != time(`+Time_value[value][0]+`,` +Time_value[value][1]+`)
										);
										`
										constraints+=constraint
									}break;	
								}
							}break;
						
							default:
								break;
						}
						
						
						 
					});	
				});
			});
			solve("movie_buffs_associated.txt",constraints,id.id_table_movie)
		}break;
		case id.id_table_computer:
		{
			let data=JSON.parse(sessionStorage.getItem(id.session_computer_data))
			let constraints=""
			Object.keys(data).forEach(function(Monitor) {
				Object.keys(data[Monitor]).forEach(function(type) {
					if(type==type_index_computer[3])
					{
						switch (data[Monitor][type]) {
							case State_button.Check:
							{
								let constraint=`
								% CPU x monitor
								constraint exists(computer_indexe in computer_indexes)
								(
									andrew_computer_index = ` + Monitor_index[Monitor] + `
									/\\ monitor_indexes[monitor_values[computer_indexe]] = ` + Monitor+ `
								);
								`
								//console.log(constraint)
								constraints+=constraint
							}break;
							case State_button.Cross:
							case State_button.Cross_Disable:
							{
								let constraint=`
								constraint exists(computer_indexe in computer_indexes)
								(
									andrew_computer_index != ` + Monitor_index[Monitor] + `
									\\/ monitor_indexes[monitor_values[computer_indexe]] != ` + Monitor+ `
								);
								`
								constraints+=constraint
							}break;	
						}
					}else{
						Object.keys(data[Monitor][type]).forEach(function(value) {
						
						
							switch (type) {
								//Processor
								case type_index_computer[0]:
								{
									switch (data[Monitor][type][value]) {
										case State_button.Check:
										{
											let constraint=`
											% CPU x monitor
											constraint exists(computer_indexe in computer_indexes)
											(
												processor_indexes[processor_values[computer_indexe]] = ` + value + `
												/\\ monitor_indexes[monitor_values[computer_indexe]] = ` + Monitor+ `
											);
											`
											//console.log(constraint)
											constraints+=constraint
										}break;
										case State_button.Cross:
										case State_button.Cross_Disable:
										{
											let constraint=`
											constraint exists(computer_indexe in computer_indexes)
											(
												processor_indexes[processor_values[computer_indexe]] != ` + value + `
												\\/ monitor_indexes[monitor_values[computer_indexe]] != ` + Monitor+ `
											);
											`
											constraints+=constraint
										}break;	
									}
								}break;
								//Hard_disk
								case type_index_computer[1]:
								{
									switch (data[Monitor][type][value]) {
										case State_button.Check:
										{
											let constraint=`
											constraint exists(computer_indexe in computer_indexes)
											(
												hard_disk_indexes[hard_disk_values[computer_indexe]] = ` + value + `
												/\\ monitor_indexes[monitor_values[computer_indexe]] = ` + Monitor+ `
											);
											`
											//console.log(constraint)
											constraints+=constraint
										}break;
										case State_button.Cross:
										case State_button.Cross_Disable:
										{
											let constraint=`
											constraint exists(computer_indexe in computer_indexes)
											(
												hard_disk_indexes[hard_disk_values[computer_indexe]] != ` + value + `
												\\/ monitor_indexes[monitor_values[computer_indexe]] != ` + Monitor+ `
											);
													`
											constraints+=constraint
										}break;	
									}
								}break;
								//Price
								case type_index_computer[2]:
								{
									switch (data[Monitor][type][value]) {
										case State_button.Check:
										{
											let constraint=`
											constraint exists(computer_indexe in computer_indexes)
											(
												price_indexes[price_values[computer_indexe]] = ` + value + `
												/\\ monitor_indexes[monitor_values[computer_indexe]] = ` + Monitor+ `
											);
											`
											constraints+=constraint
										}break;
										case State_button.Cross:
										case State_button.Cross_Disable:
										{
											let constraint=`
											constraint exists(computer_indexe in computer_indexes)
											(
												price_indexes[price_values[computer_indexe]] != ` + value + `
												\\/ monitor_indexes[monitor_values[computer_indexe]] != ` + Monitor+ `
											);
											`
											constraints+=constraint
										}break;	
									}
								}break;
								
								default:
									break;
							}
							
							
							 
						});	
					
					}
				});
					
			});
			//console.log(constraints)
			solve("a_new_personal_computer.txt",constraints,id.id_table_computer)
		}break;

		case id.id_table_pasta:
		{
			
			let constraints=""
			let data=JSON.parse(sessionStorage.getItem(id.session_pasta_data))
			
			console.log(data)
			Object.keys(data).forEach(Women=>{
				data[Women].forEach((type_donne,index)=>{
					Object.keys(type_donne).forEach(donne=>{

						switch (index) {
							//Shirt
							case 0:
							{
								switch (data[Women][index][donne]) {
									case State_liste.Check:
									{
										let constraint=`
										constraint shirt_people[`+(parseInt(Women)+1)+ `]=`+donne+`;
										`
										//console.log(constraint)
										constraints+=constraint
									}break;
									case State_liste.Disable:
									{
										let constraint=`
										constraint shirt_people[`+(parseInt(Women)+1)+ `]!=`+donne+`;
												`
										constraints+=constraint
									}break;	
								}
							}
							break;
							//Name
							case 1:
							{
								switch (data[Women][index][donne]) {
									case State_liste.Check:
									{
										let constraint=`
										constraint name_people[`+(parseInt(Women)+1)+ `]=`+donne+`;
										`
										//console.log(constraint)
										constraints+=constraint
									}break;
									case State_liste.Disable:
									{
										let constraint=`
										constraint name_people[`+(parseInt(Women)+1)+ `]!=`+donne+`;
												`
										constraints+=constraint
									}break;	
								}
							}
							break;
							//Surname
							case 2:
							{
								switch (data[Women][index][donne]) {
									case State_liste.Check:
									{
										let constraint=`
										constraint surname_people[`+(parseInt(Women)+1)+ `]=`+donne+`;
										`
										//console.log(constraint)
										constraints+=constraint
									}break;
									case State_liste.Disable:
									{
										let constraint=`
										constraint surname_people[`+(parseInt(Women)+1)+ `]!=`+donne+`;
												`
										constraints+=constraint
									}break;	
								}
							}
							break;
							//Pasta
							case 3:
							{
								switch (data[Women][index][donne]) {
									case State_liste.Check:
									{
										let constraint=`
										constraint pasta_people[`+(parseInt(Women)+1)+ `]=`+donne+`;
										`
										//console.log(constraint)
										constraints+=constraint
									}break;
									case State_liste.Disable:
									{
										let constraint=`
										constraint pasta_people[`+(parseInt(Women)+1)+ `]!=`+donne+`;
												`
										constraints+=constraint
									}break;	
								}
							}
							break;
							//Wine
							case 4:
							{
								switch (data[Women][index][donne]) {
									case State_liste.Check:
									{
										let constraint=`
										constraint wine_people[`+(parseInt(Women)+1)+ `]=`+donne+`;
										`
										//console.log(constraint)
										constraints+=constraint
									}break;
									case State_liste.Disable:
									{
										let constraint=`
										constraint wine_people[`+(parseInt(Women)+1)+ `]!=`+donne+`;
												`
										constraints+=constraint
									}break;	
								}
							}
							break;
							//Age
							case 5:
							{
								switch (data[Women][index][donne]) {
									case State_liste.Check:
									{
										let constraint=`
										constraint age_people[`+(parseInt(Women)+1)+ `]=`+donne+`;
										`
										//console.log(constraint)
										constraints+=constraint
									}break;
									case State_liste.Disable:
									{
										let constraint=`
										constraint age_people[`+(parseInt(Women)+1)+ `]!=`+donne+`;
												`
										constraints+=constraint
									}break;	
								}
							}
							break;
						}
					})	
				})
			})
			console.log(constraints)
			solve("pasta_and_wine.txt",constraints,id.id_table_pasta)
		}break;
	
		default:
			break;
	}
	
}

function click_table(e,id_table)
{
	//pour chpper l'axe x de la cellule taper e.target.cellIndex 
	//attention a l'axe x sur la row 2 parce que du au rowspan de name l'index est decaler de 1
	//pour chopper l'axe y de la cellule taper e.target.parentNode.rowIndex
	switch (id_table) {
		case id.id_table_movie:
		{
			let x=e.target.cellIndex
			let y=e.target.parentNode.rowIndex
			if(y==2)
			{
				x-=1
			}

			if(y>1 && x>0 )
			{
				y-=2
				x-=1

				let data=JSON.parse(sessionStorage.getItem(id.session_movie_data))
				//console.log(data[Personne[y]][type_index[parseInt(x/5)]][type[type_index[parseInt(x/5)]][x%5]])

				switch (data[Personne[y]][type_index[parseInt(x/5)]][type[type_index[parseInt(x/5)]][x%5]]) {
					case State_button.Check:
					{
						for(let i=0;i<5;++i)
						{
							if(i!=x%5)
							{
								let asup=1
								for(let k=0;k<5;++k)
								{
									if(data[Personne[k]][type_index[parseInt(x/5)]][type[type_index[parseInt(x/5)]][i]]==State_button.Check)
									{
										asup=0
									}
								}
								if(asup==1)
								{
									data[Personne[y]][type_index[parseInt(x/5)]][type[type_index[parseInt(x/5)]][i]]=State_button.None
								}
							}else{
								data[Personne[y]][type_index[parseInt(x/5)]][type[type_index[parseInt(x/5)]][i]]=State_button.None
							}
						}
						for(let i=0;i<5;++i)
						{
							if(i!=x/5)
							{
								let asup=1
								for(let k=0;k<5;++k)
								{
									if(data[Personne[i]][type_index[parseInt(x/5)]][type[type_index[parseInt(x/5)]][k]]==State_button.Check)
									{
										asup=0
									}
								}
								if(asup==1)
								{
									data[Personne[i]][type_index[parseInt(x/5)]][type[type_index[parseInt(x/5)]][x%5]]=State_button.None
								}
							}else{
								data[Personne[i]][type_index[parseInt(x/5)]][type[type_index[parseInt(x/5)]][x%5]]=State_button.None
							}

						}
					}break;
					case State_button.Cross:
					{
						for(let i=0;i<5;++i)
						{
							if(i!=x%5)
							{
								data[Personne[y]][type_index[parseInt(x/5)]][type[type_index[parseInt(x/5)]][i]]=State_button.Cross_Disable
							}else{
								data[Personne[y]][type_index[parseInt(x/5)]][type[type_index[parseInt(x/5)]][i]]=State_button.Check
							}
						}
						for(let i=0;i<5;++i)
						{
							if(i!=y)
							{
								data[Personne[i]][type_index[parseInt(x/5)]][type[type_index[parseInt(x/5)]][x%5]]=State_button.Cross_Disable
							}else{
								data[Personne[i]][type_index[parseInt(x/5)]][type[type_index[parseInt(x/5)]][x%5]]=State_button.Check
							}
						}
					}break;
					case State_button.None:
					{

						data[Personne[y]][type_index[parseInt(x/5)]][type[type_index[parseInt(x/5)]][x%5]]=State_button.Cross
					}break;
				}
				//check_information(id.id_table_movie,data)
				sessionStorage.setItem(id.session_movie_data, JSON.stringify(data));
				charge_donne_tableau(id.id_table_movie)
			}

		}
		break;
		case id.id_table_computer:
		{
			let x=e.target.cellIndex
			let y=e.target.parentNode.rowIndex
			if(y==2)
			{
				x-=1
			}
			
			if(y>1 && x>0 )
			{
				y-=2
				x-=1
				let data=JSON.parse(sessionStorage.getItem(id.session_computer_data))
				if(x==15)
				{
					switch(data[Monitor[y]][type_index_computer[3]])
					{
						case State_button.Check:
						{
							for(let i=0;i<5;++i)
							{
								data[Monitor[i]][type_index_computer[3]]=State_button.None
							}
						}break;
						case State_button.Cross:
						{
							for(let i =0;i<5;++i)
							{
								data[Monitor[i]][type_index_computer[3]]=State_button.Cross_Disable
							}
							data[Monitor[y]][type_index_computer[3]]=State_button.Check
						}break;

						case State_button.None:
						{
							data[Monitor[y]][type_index_computer[3]]=State_button.Cross
						}break;

					}
				}else{
					switch (data[Monitor[y]][type_index_computer[parseInt(x/5)]][type_computer[type_index_computer[parseInt(x/5)]][x%5]]) {
						case State_button.Check:
						{
							for(let i=0;i<5;++i)
							{
								if(i!=x%5)
								{
									let asup=1
									for(let k=0;k<5;++k)
									{
										if(data[Monitor[k]][type_index_computer[parseInt(x/5)]][type_computer[type_index_computer[parseInt(x/5)]][i]]==State_button.Check)
										{
											asup=0
										}
									}
									if(asup==1)
									{
										data[Monitor[y]][type_index_computer[parseInt(x/5)]][type_computer[type_index_computer[parseInt(x/5)]][i]]=State_button.None
									}
								}else{
									data[Monitor[y]][type_index_computer[parseInt(x/5)]][type_computer[type_index_computer[parseInt(x/5)]][i]]=State_button.None
								}
							}
							for(let i=0;i<5;++i)
							{
								if(i!=x/5)
								{
									let asup=1
									for(let k=0;k<5;++k)
									{
										if(data[Monitor[i]][type_index_computer[parseInt(x/5)]][type_computer[type_index_computer[parseInt(x/5)]][k]]==State_button.Check)
										{
											asup=0
										}
									}
									if(asup==1)
									{
										data[Monitor[i]][type_index_computer[parseInt(x/5)]][type_computer[type_index_computer[parseInt(x/5)]][x%5]]=State_button.None
									}
								}else{
									data[Monitor[i]][type_index_computer[parseInt(x/5)]][type_computer[type_index_computer[parseInt(x/5)]][x%5]]=State_button.None
								}
								
							}
						}break;
						case State_button.Cross:
						{
							for(let i=0;i<5;++i)
							{
								if(i!=x%5)
								{
									data[Monitor[y]][type_index_computer[parseInt(x/5)]][type_computer[type_index_computer[parseInt(x/5)]][i]]=State_button.Cross_Disable
								}else{
									data[Monitor[y]][type_index_computer[parseInt(x/5)]][type_computer[type_index_computer[parseInt(x/5)]][i]]=State_button.Check
								}
							}
							for(let i=0;i<5;++i)
							{
								if(i!=y)
								{
									data[Monitor[i]][type_index_computer[parseInt(x/5)]][type_computer[type_index_computer[parseInt(x/5)]][x%5]]=State_button.Cross_Disable
								}else{
									data[Monitor[i]][type_index_computer[parseInt(x/5)]][type_computer[type_index_computer[parseInt(x/5)]][x%5]]=State_button.Check
								}
							}
						}break;
						case State_button.None:
						{
							
							data[Monitor[y]][type_index_computer[parseInt(x/5)]][type_computer[type_index_computer[parseInt(x/5)]][x%5]]=State_button.Cross
						}break;
					}
				}

				
				//check_information(id.id_table_movie,data)
				sessionStorage.setItem(id.session_computer_data, JSON.stringify(data));
				charge_donne_tableau(id.id_table_computer)
			}
		}break;
		case id.id_table_pasta:
		{
			let data =JSON.parse( sessionStorage.getItem(id.session_pasta_data))
			let optionchoose=e.target.selectedIndex
			let x=e.target.parentNode.parentNode.cellIndex-1
			let y=e.target.parentNode.parentNode.parentNode.rowIndex-1
			
			for(let i=0;i<type_pasta[y].length;++i)
			{
				if(data[x][y][type_pasta[y][i]]==State_liste.Check)
				{
					data[x][y][type_pasta[y][i]]=State_liste.None
				}
			}

			if(optionchoose<5)
			{

				data[x][y][type_pasta[y][optionchoose]]=State_liste.Check
			}
			

			let optionchooses=[]
			for(let i=0;i<5;++i)
			{
				Object.keys(data[i][y]).forEach(key=>{
					if(data[i][y][key]==State_liste.Check)
					{
						optionchooses.push(key)
					}
				})
			}
			for(let i=0;i<5;++i)
			{
				Object.keys(data[i][y]).forEach(key=>{
					if(optionchooses.includes(key))
					{
						if(data[i][y][key]!=State_liste.Check)
						{
							data[i][y][key]=State_liste.Disable
						}
					}else{
						if(data[i][y][key]!=State_liste.Check)
						{
							data[i][y][key]=State_liste.None
						}
					}
				})
			}
			sessionStorage.setItem(id.session_pasta_data,JSON.stringify(data) )
			charge_donne_tableau(id.id_table_pasta)			



		}break;
	
	}
	
	

	
}

function gestion_option_pasta()
{
	let selects=document.getElementById(id.id_table_pasta).getElementsByTagName("select")
	for (let select of selects) 
	{	
		select.addEventListener("change",(e)=>{click_table(e,id.id_table_pasta)})	
	}
}

function onload()
{
	if(!sessionStorage.getItem(id.session_movie_data))
	{
		sessionStorage.setItem(id.session_movie_data, JSON.stringify(movie));
	}
	if(!sessionStorage.getItem(id.session_computer_data))
	{
		sessionStorage.setItem(id.session_computer_data, JSON.stringify(computer));
	}
	if(!sessionStorage.getItem(id.session_pasta_data))
	{
		sessionStorage.setItem(id.session_pasta_data,JSON.stringify(pasta))
	}

	if(!sessionStorage.getItem(id.id_tab_save))
	{
		sessionStorage.setItem(id.id_tab_save,id.tabs_movie_buffs)
	}
	changement_tab(sessionStorage.getItem(id.id_tab_save))
	
	

	document.getElementById(id.tabs_movie_buffs).addEventListener("click",(e)=>{
		changement_tab(id.tabs_movie_buffs)
	})
	document.getElementById(id.tabs_new_computer).addEventListener("click",(e)=>{
		changement_tab(id.tabs_new_computer)
	})
	document.getElementById(id.tabs_pasta_wine).addEventListener("click",(e)=>{
		changement_tab(id.tabs_pasta_wine)
	})
	document.getElementById(id.tabs_creation_puzzle).addEventListener("click",(e)=>{
		changement_tab(id.tabs_creation_puzzle)
	})

	document.getElementById(id.id_clear_table_movie).addEventListener("click",(e)=>{
		sessionStorage.setItem(id.session_movie_data, JSON.stringify(movie))
		charge_donne_tableau(id.id_table_movie)
		
	})

	document.getElementById(id.id_clear_table_pasta).addEventListener("click",(e)=>{
		sessionStorage.setItem(id.session_pasta_data, JSON.stringify(pasta))
		charge_donne_tableau(id.id_table_pasta)
	})

	document.getElementById(id.id_clear_table_computer).addEventListener("click",(e)=>{
		sessionStorage.setItem(id.session_computer_data, JSON.stringify(computer))
		charge_donne_tableau(id.id_table_computer)
		
	})

	document.getElementById(id.id_check_table_movie).addEventListener("click",(e)=>{
		check_information(id.id_table_movie)
	})

	document.getElementById(id.id_check_table_computer).addEventListener("click",(e)=>{
		check_information(id.id_table_computer)
	})
	document.getElementById(id.id_check_table_pasta).addEventListener("click",(e)=>{
		check_information(id.id_table_pasta)
	})
	

	document.getElementById(id.id_table_movie).addEventListener("click",(e)=>{
		click_table(e,id.id_table_movie)
	} )

	document.getElementById(id.id_table_computer).addEventListener("click",(e)=>{
		click_table(e,id.id_table_computer)
	} )
	gestion_option_pasta()

	charge_donne_tableau(id.id_table_movie)
	charge_donne_tableau(id.id_table_computer)
	charge_donne_tableau(id.id_table_pasta)



}
onload()

//solve('movie_buffs_associated.txt');
/*solve('a_new_personal_computer.txt');
solve('pasta_and_wine.txt');*/