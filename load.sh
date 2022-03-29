#!/bin/bash

echo "$2 starting... "

for I in  $(seq 1 $1)
do 
    echo "[$2]: test $I"
    sleep 1
done 

echo "$2 done 😎"