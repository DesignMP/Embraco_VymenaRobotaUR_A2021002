<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<!--SG4_Import_ToDo_Generator.xsl-->
<!--KCZ 21.09.2006-->

<xsl:template match="/">
	<html>
		<body>
      <xsl:apply-templates/>
		</body>
	</html>
</xsl:template>

  <!--Header -->
  <xsl:template match="Header">
    <h1>SG4 project import log</h1>
    
    Import date: <xsl:value-of select="Property[@Name='ImportDate']/@Value"/><br/>
    Source project: <xsl:value-of select="Property[@Name='SourceVisualization']/@Value"/><br/>
    Target project: <xsl:value-of select="Property[@Name='TargetVisualization']/@Value"/><br/>
    <br/>

  </xsl:template>

  <!--Resources -->
  <xsl:template match="Resources">
    <xsl:if test="count(Resource/LostDependencies/*) != 0">
      <a href="#LostDependencies">Resources with lost dependencies</a>
      <br/>
    </xsl:if>
    <xsl:if test="count(Resource/Property[@Name='Modification']) != 0">
      <a href="#Modified">Modified resources</a>
      <br/>
    </xsl:if>

    <!--Lost dependencies table-->
    <xsl:if test="count(Resource/LostDependencies/*) != 0">
      <h2><a name="LostDependencies"/>Resources with lost dependencies</h2>
      <table frame="border" border="1" rules="all" width="100%">
        <tr>
          <th>Resource</th>
          <th>Dependency id</th>
          <th>Resolution</th>
        </tr>
        
        <xsl:for-each select="Resource">
          <xsl:sort select="Property[@Name='Reference']/@Value"/>
          
          <xsl:if test="count(LostDependencies/*) != 0">
            <tr>
              <xsl:variable name="rowspan" select="count(LostDependencies/*) + 1"/>
              <td rowspan="{$rowspan}"><xsl:value-of select="Property[@Name='Reference']/@Value"/></td>
            </tr>
            <xsl:for-each select="LostDependencies/Dependency">
              <xsl:sort select="Property[@Name='ReferencePath']/@Value"/>
              
              <tr>
                <td><xsl:value-of select="Property[@Name='ReferencePath']/@Value"/></td>
                <td><xsl:value-of select="Property[@Name='Resolution']/@Value"/></td>
              </tr>
            </xsl:for-each>
          </xsl:if>
        </xsl:for-each>
      </table>
    </xsl:if>

    <!--Modified resources table-->
    <xsl:if test="count(Resource/Property[@Name='Modification']) != 0">
      <h2>
        <a name="Modified"/>Modified resources
      </h2>
      <table frame="border" border="1" rules="all" width="100%">
        <tr>
          <th>Resource</th>
          <th>Operation</th>
          <th>Modification</th>
        </tr>

        <xsl:for-each select="Resource">
          <xsl:sort select="Property[@Name='Reference']/@Value"/>
          <xsl:if test="count(Property[@Name='Modification']) != 0">
            <tr>
              <td>
                <xsl:value-of select="Property[@Name='Reference']/@Value"/>
              </td>
              <td>
                <xsl:value-of select="Property[@Name='Operation']/@Value"/>
              </td>
              <td>
                <xsl:value-of select="Property[@Name='Modification']/@Value"/>
              </td>
            </tr>
          </xsl:if>
        </xsl:for-each>
      </table>
    </xsl:if>

  </xsl:template>
</xsl:stylesheet>
