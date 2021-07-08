
const db = firebase.firestore();
const tasksContainer = document.getElementById('tasks-container');
const fecha = new Date();
const taskForm = document.getElementById('task-form');
const anio = fecha.getFullYear();
const mes = fecha.getMonth()+1;
const dia = fecha.getDate();
const toDay = dia + "/" + mes + "/" + anio;


const saveTask = (title, descripcion)=>
  db.collection('task').doc().set({
		title,
		descripcion,
	});

const getTask = () =>db.collection('task').get();

window.addEventListener('DOMContentLoaded', async (e) =>{
	console.log(toDay);
	
	const querySnapshot = await getTask();
	querySnapshot.forEach(doc => {
		console.log(doc.data())
		tasksContainer.innerHTML += `<div> 
		${doc.data().title}
  </div>`;
	})

})

taskForm.addEventListener('submit', async (e)=>{
	e.preventDefault(); 
	const title = taskForm['task-title'];
	const descripcion = taskForm['task-description'];
	if(title.value != ""){
		if(descripcion.value != ""){
			alert("Diste click")
			await saveTask(title.value,descripcion.value);
			taskForm.reset();
		}else
			alert("Favor ingrese una descripcion")
	
			
	}else if(descripcion.value != ""){
		alert("Favor ingrese una descripcion")
	}else{
		alert("Favor ingrese una titulo")
	}
		
	title.focus();	
		
	
});