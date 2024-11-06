const service = {
    getDefault(){
        return {
            id: Date.now().toString(16) + "_" + Math.ceil(Math.random() * 1000).toString(16),
            text: "",
            status: "non_started"
        }
    },
    getStatusList(){
        return [
            { id: "not_started", label: "Not started" },
            { id: "in_progress", label: "In progress" },
            { id: "completed", label: "Completed" }
        ]
    },
    validateTodo(item){
        return item.text.length>0;
    },
    makeCopy(item){
        return JSON.parse(JSON.stringify(item))
    },
    toggleStatus(status){
        switch(status){
            case "not_started":
                return "in_progress"
            case "in_progress":
                return "completed"
            case "completed":
                return "not_started"
        }
    },
    createTodoProject(name=""){
        let projects = service.loadProjectsManifest()

        // Подготовка нового проекта
        let project_id=projects.next_id

        // Обновление переменной projects
        projects.next_id++;
        projects.list.push({id:project_id, name});

        // Добавление проекта в localStorage
        localStorage.setItem(`project.${project_id}`, "[]")

        // Сохранить projects 
        service.saveProjectsManifest(projects)
    },
    loadProjectsManifest(){
        // Проверка существует ли список проектов в localStorage
        let projects=localStorage.getItem("projects");

        // Если не существует, мы создаем проект по-умолчанию
        if(!projects){
            projects={next_id:0, list:[]}
        }else{
            projects=JSON.parse(projects)
        }
        return projects;
    },
    saveProjectsManifest(projects={}){
        // Сохраняем список проектов
        localStorage.setItem("projects", JSON.stringify(projects))
    },
    deleteProject(project_id){
        // Извлекаем список проектов и находим проект по индексу
        let manifest=service.loadProjectsManifest(),
            project_index=manifest.list.findIndex(p=>{
                return p.id==project_id
            })

        // Если индекс проект существует (найден) ...
        if(project_index>-1){
        
            // Удаляем проект из списка
            manifest.list.splice(project_index, 1)
            service.saveProjectsManifest(manifest)

            // Удаляем из localStorage
            localStorage.removeItem(`project.${project_id}`)
            
        }
    },
    loadProject(project_id){
        // Извлечение проекта из localStorage и преобразование в JSON
        return JSON.parse(localStorage.getItem(`project.${project_id}`))
    },
    saveProject(project_id, data){
        // Сохранение проекта в localStorage посредством преобразования в строку
        localStorage.setItem(`project.${project_id}`, JSON.stringify(data))
    },
    getProjectName(project_id){
        // Извлечь проект из списка и вернуть имя
        let manifest=service.loadProjectsManifest(),
            project=manifest.list.find(p=>{
                return p.id==project_id
            })
        if(project){
            return project.name
        }else{
            return ""
        }
    }
}

export default service