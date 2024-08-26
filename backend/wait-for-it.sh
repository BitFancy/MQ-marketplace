#!/usr/bin/env bash
#   Use this script to test if a given TCP host/port are available

set -e

TIMEOUT=15
QUIET=0
HOST="$1"
shift
PORT="$1"
shift

while [[ $# -gt 0 ]]
do
key="$1"
case $key in
    -q|--quiet)
    QUIET=1
    shift # past argument
    ;;
    -t|--timeout)
    TIMEOUT="$2"
    shift # past argument
    shift # past value
    ;;
    --)
    shift
    break
    ;;
    *)
    echo "Unknown argument: $key"
    exit 1
    ;;
esac
done

QUIET_ARG=""
if [[ "$QUIET" == "1" ]]
then
    QUIET_ARG="&>/dev/null"
fi

WAITFORIT_cmd='for i in `seq 1 $TIMEOUT` ; do nc -z "$HOST" "$PORT" $QUIET_ARG && break || sleep 1 ; done'

if [ "$QUIET" -eq 1 ]
then 
  eval $WAITFORIT_cmd
else
  eval $WAITFORIT_cmd || (echo "Timeout after ${TIMEOUT} seconds waiting for ${HOST}:${PORT}" && false)
fi
