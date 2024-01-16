########### AGGREGATED COMPONENTS AND DEPENDENCIES FOR THE MULTI CONFIG #####################
#############################################################################################

set(trantor_COMPONENT_NAMES "")
list(APPEND trantor_FIND_DEPENDENCY_NAMES c-ares OpenSSL)
list(REMOVE_DUPLICATES trantor_FIND_DEPENDENCY_NAMES)
set(c-ares_FIND_MODE "NO_MODULE")
set(OpenSSL_FIND_MODE "NO_MODULE")

########### VARIABLES #######################################################################
#############################################################################################
set(trantor_PACKAGE_FOLDER_RELEASE "/home/viallard/MEGA/Etudes/Cours/Semestre_1/UE3_-_Optimisation_appliquée/csp_games/app/conan/home/p/trant17854819e674c/p")
set(trantor_BUILD_MODULES_PATHS_RELEASE )


set(trantor_INCLUDE_DIRS_RELEASE "${trantor_PACKAGE_FOLDER_RELEASE}/include")
set(trantor_RES_DIRS_RELEASE )
set(trantor_DEFINITIONS_RELEASE )
set(trantor_SHARED_LINK_FLAGS_RELEASE )
set(trantor_EXE_LINK_FLAGS_RELEASE )
set(trantor_OBJECTS_RELEASE )
set(trantor_COMPILE_DEFINITIONS_RELEASE )
set(trantor_COMPILE_OPTIONS_C_RELEASE )
set(trantor_COMPILE_OPTIONS_CXX_RELEASE )
set(trantor_LIB_DIRS_RELEASE "${trantor_PACKAGE_FOLDER_RELEASE}/lib")
set(trantor_BIN_DIRS_RELEASE )
set(trantor_LIBRARY_TYPE_RELEASE STATIC)
set(trantor_IS_HOST_WINDOWS_RELEASE 0)
set(trantor_LIBS_RELEASE trantor)
set(trantor_SYSTEM_LIBS_RELEASE pthread m)
set(trantor_FRAMEWORK_DIRS_RELEASE )
set(trantor_FRAMEWORKS_RELEASE )
set(trantor_BUILD_DIRS_RELEASE )
set(trantor_NO_SONAME_MODE_RELEASE FALSE)


# COMPOUND VARIABLES
set(trantor_COMPILE_OPTIONS_RELEASE
    "$<$<COMPILE_LANGUAGE:CXX>:${trantor_COMPILE_OPTIONS_CXX_RELEASE}>"
    "$<$<COMPILE_LANGUAGE:C>:${trantor_COMPILE_OPTIONS_C_RELEASE}>")
set(trantor_LINKER_FLAGS_RELEASE
    "$<$<STREQUAL:$<TARGET_PROPERTY:TYPE>,SHARED_LIBRARY>:${trantor_SHARED_LINK_FLAGS_RELEASE}>"
    "$<$<STREQUAL:$<TARGET_PROPERTY:TYPE>,MODULE_LIBRARY>:${trantor_SHARED_LINK_FLAGS_RELEASE}>"
    "$<$<STREQUAL:$<TARGET_PROPERTY:TYPE>,EXECUTABLE>:${trantor_EXE_LINK_FLAGS_RELEASE}>")


set(trantor_COMPONENTS_RELEASE )