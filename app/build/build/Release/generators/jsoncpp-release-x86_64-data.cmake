########### AGGREGATED COMPONENTS AND DEPENDENCIES FOR THE MULTI CONFIG #####################
#############################################################################################

set(jsoncpp_COMPONENT_NAMES "")
set(jsoncpp_FIND_DEPENDENCY_NAMES "")

########### VARIABLES #######################################################################
#############################################################################################
set(jsoncpp_PACKAGE_FOLDER_RELEASE "/home/viallard/MEGA/Etudes/Cours/Semestre_1/UE3_-_Optimisation_appliquée/csp_games/app/conan/home/p/jsoncb6ff2e28b1024/p")
set(jsoncpp_BUILD_MODULES_PATHS_RELEASE )


set(jsoncpp_INCLUDE_DIRS_RELEASE "${jsoncpp_PACKAGE_FOLDER_RELEASE}/include")
set(jsoncpp_RES_DIRS_RELEASE )
set(jsoncpp_DEFINITIONS_RELEASE )
set(jsoncpp_SHARED_LINK_FLAGS_RELEASE )
set(jsoncpp_EXE_LINK_FLAGS_RELEASE )
set(jsoncpp_OBJECTS_RELEASE )
set(jsoncpp_COMPILE_DEFINITIONS_RELEASE )
set(jsoncpp_COMPILE_OPTIONS_C_RELEASE )
set(jsoncpp_COMPILE_OPTIONS_CXX_RELEASE )
set(jsoncpp_LIB_DIRS_RELEASE "${jsoncpp_PACKAGE_FOLDER_RELEASE}/lib")
set(jsoncpp_BIN_DIRS_RELEASE )
set(jsoncpp_LIBRARY_TYPE_RELEASE STATIC)
set(jsoncpp_IS_HOST_WINDOWS_RELEASE 0)
set(jsoncpp_LIBS_RELEASE jsoncpp)
set(jsoncpp_SYSTEM_LIBS_RELEASE m)
set(jsoncpp_FRAMEWORK_DIRS_RELEASE )
set(jsoncpp_FRAMEWORKS_RELEASE )
set(jsoncpp_BUILD_DIRS_RELEASE )
set(jsoncpp_NO_SONAME_MODE_RELEASE FALSE)


# COMPOUND VARIABLES
set(jsoncpp_COMPILE_OPTIONS_RELEASE
    "$<$<COMPILE_LANGUAGE:CXX>:${jsoncpp_COMPILE_OPTIONS_CXX_RELEASE}>"
    "$<$<COMPILE_LANGUAGE:C>:${jsoncpp_COMPILE_OPTIONS_C_RELEASE}>")
set(jsoncpp_LINKER_FLAGS_RELEASE
    "$<$<STREQUAL:$<TARGET_PROPERTY:TYPE>,SHARED_LIBRARY>:${jsoncpp_SHARED_LINK_FLAGS_RELEASE}>"
    "$<$<STREQUAL:$<TARGET_PROPERTY:TYPE>,MODULE_LIBRARY>:${jsoncpp_SHARED_LINK_FLAGS_RELEASE}>"
    "$<$<STREQUAL:$<TARGET_PROPERTY:TYPE>,EXECUTABLE>:${jsoncpp_EXE_LINK_FLAGS_RELEASE}>")


set(jsoncpp_COMPONENTS_RELEASE )