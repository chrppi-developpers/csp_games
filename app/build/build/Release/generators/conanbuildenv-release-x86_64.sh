script_folder="/home/viallard/MEGA/Etudes/Cours/Semestre_1/UE3_-_Optimisation_appliquée/csp_games/app/build/build/Release/generators"
echo "echo Restoring environment" > "$script_folder/../../../build/Release/generators/deactivate_conanbuildenv-release-x86_64.sh"
for v in 
do
    is_defined="true"
    value=$(printenv $v) || is_defined="" || true
    if [ -n "$value" ] || [ -n "$is_defined" ]
    then
        echo export "$v='$value'" >> "$script_folder/../../../build/Release/generators/deactivate_conanbuildenv-release-x86_64.sh"
    else
        echo unset $v >> "$script_folder/../../../build/Release/generators/deactivate_conanbuildenv-release-x86_64.sh"
    fi
done

