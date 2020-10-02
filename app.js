


$(function(){
    let edit = false;
    console.log('JQuery is working');
    $('#task-result').hide();
    fetchTasks();

    $('#search').keyup(function(e){
        if($('#search').val()){
            let search = $('#search').val();
            $.ajax({
                url:'task-search.php',
                type:'POST',
                data:{search},
                success:function(response){
                    let tasks = JSON.parse(response);
                    let template = '';
                    tasks.forEach(task => {
                        template += `
                            <li>
                                ${task.name}
                            </li>`
                    });
                    $('#container').html(template);
                    $('#task-result').show();
                }
            });
        }
    });

    $('#task-form').submit(function(e){
        const postData = {
            task:$('#task').val(),
            description:$('#description').val(),
            id:$('#taskId').val()
        };

        let url = edit===false ? 'task-add.php' : 'task-edit.php';

        $.post(url,postData,function(response){
            console.log(response);
            fetchTasks();
            $('.messagealert').html(template)
            $('#task-form').trigger('reset');
        })
        e.preventDefault();
    });

    function fetchTasks(){
        $.ajax({
            url:'task-list.php',
            type:'GET',
            success:function(response){
                let tasks = JSON.parse(response);
                let template = '';
                let number = 1;
                tasks.forEach(task=>{
                    template += `
                        <tr taskId=${task.id}>
                            <td>${number}</td>
                            <td>${task.name}</td>
                            <td>${task.description}</td>
                            <td>
                                <button  class=" task-edit btn btn-info"><i class="fas fa-pen"></i></button>
                                <button  class=" task-delete btn btn-danger"><i class="fas fa-trash"></i></button>
                            </td>
                        </tr>
                    `
                    number += 1;
                });
                $('#tasks').html(template)
            }
        })
    };

    $(document).on('click','.task-delete',function(){
        if(confirm('Are you sure you want to delete it?')){
            let element = $(this)[0].parentElement.parentElement;
            let id = $(element).attr('taskId');
            console.log(id);
            $.post('task-delete',{id},function(response){
                console.log(response);
                fetchTasks();
            });
        }
    });

    $(document).on('click','.task-edit',function(){
        let element = $(this)[0].parentElement.parentElement;
        let id = $(element).attr('taskId');
        $.post('task-single.php',{id},function(response){
            let task = JSON.parse(response);
            $('#taskId').val(task[0].id)
            $('#task').val(task[0].name);
            $('#description').val(task[0].description);
            edit = true;

        })
    })
})