from django.http import Http404

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Pokemon
from .serializers import PokemonSerializer


class PokemonDetail(APIView):
    """
    Retrieve, update or delete a Pokemon instance.
    """
    def get_object(self, pk):
        try:
            return Pokemon.objects.get(pk=pk)
        except Pokemon.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        Pokemon = self.get_object(pk)
        serializer = PokemonSerializer(Pokemon)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        Pokemon = self.get_object(pk)
        serializer = PokemonSerializer(Pokemon, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        Pokemon = self.get_object(pk)
        Pokemon.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class PokemonList(APIView):
    def get(self, request, format=None):
        pokemons = Pokemon.objects.all()
        serializer = PokemonSerializer(pokemons, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = PokemonSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
