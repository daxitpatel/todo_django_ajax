from django.urls import path
from .views import homepage_view, saveform, delete_view, completed_view

urlpatterns = [
			path('', homepage_view,name='home'),
			path('new/',saveform,name='create'),
			path('delete/',delete_view,name='delete'),
			path('completed/',completed_view,name='completed'),

]