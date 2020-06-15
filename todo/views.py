from django.shortcuts import render
from .models import Todo
from django.template.loader import render_to_string
from django.http import JsonResponse
from django.http import Http404

# Create your views here.
def homepage_view(request):
	object_list = Todo.objects.all()
	context = {'object_list':object_list}
	return render(request,'index.html',context)

def saveform(request):
	data = {}
	if request.method == 'POST':
		content = request.POST.get('content')
		todoid = request.POST.get('todoid',None)
		if todoid:
			Todo.objects.filter(id=todoid).update(content=content)
			# oobj = Todo.objects.get(id=todoid)
			# oobj.content = content
			# oobj.save(update_fields=['content','timestamp','completed','updated'])
		else:
			Todo.objects.create(content=content)
		data['form_is_valid'] = True
		obj_list = Todo.objects.all()
		data['partial_list'] = render_to_string('partial_list.html',{'object_list':obj_list},request=request)
		return JsonResponse(data)
	raise Http404

def delete_view(request):
	data = {}
	if request.method == 'GET':
		delid = request.GET.get('deleteid')
		obj = Todo.objects.get(id=delid)
		obj.delete()
		data['is_deleted']=True
		obj_list = Todo.objects.all()
		data['partial_list'] = render_to_string('partial_list.html',{'object_list':obj_list},request=request)
		return JsonResponse(data)
	raise Http404

def completed_view(request):
	data = {}
	if request.method == 'GET':
		cid = request.GET.get('cid')
		obj = Todo.objects.get(id=cid)
		if obj.completed:
			obj.completed = False
		else:
			obj.completed = True
		obj.save()
		data['is_completed']=True
		obj_list = Todo.objects.all()
		data['partial_list'] = render_to_string('partial_list.html',{'object_list':obj_list},request=request)
		return JsonResponse(data)
	raise Http404