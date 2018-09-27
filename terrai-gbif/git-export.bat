::---------------------------------------------------------------------
:: A windows executable batch file that exports (checkout-index) the 
:: current HEAD of a git repository to a specified directory. 
:: - Uses relative directory access in case full path is not supplied.
:: - Exports contents to an "/export" directory inside the repository if no
::   argument is supplied
:: - Creates the entered directory if it does not yet exist
:: Dependencies: GitBash
:: madbarua;20180920
::---------------------------------------------------------------------

@echo off

:: Clear the input variable
set "export_path="

:: Get the user-input directory path or name
set /p export_path="Enter the full directory path or internal folder on which to export:"

if "%export_path%" == "" set export_path="./export/
GOTO GitExport


:GitExport
 
 if exist %export_path% (
 
   :: Check if full path (path contains ":")
   If NOT "%export_path%"=="%export_path::=%" (
	git checkout-index -f -a --prefix=%export_path%/
   ) else (
	:: Export the current HEAD to specified internal relative path
	git checkout-index -f -a --prefix=./%export_path%/	
   )   

   echo Exporting HEAD contents to: %export_path%
   GOTO End
   
 ) else (
   
   :: Create directory
   echo Creating directory %export_path%...
   mkdir %export_path%
   GOTO GitExport
   
 )
 
:End
 set "export_path="
 pause;	