<template>
    <div class="admin-page">
         <pagetitle icon="fa fa-cogs" main="administração"
        sub="cadastro & cia"/>
        <div class="admin-pages-tabs">
            <b-card no body>
                <b-tabs card>
                    <b-tab title="artigo" active><h1>artigo</h1></b-tab>
                    <b-tab title="categorias" active><h1>categorias</h1></b-tab>
                   <b-tab title="usuarios" active><h1>usuarios</h1></b-tab>
                </b-tabs>

            </b-card>

        </div>

    </div>
</template>

<script>
import pagetitle from '../template/pagetitle'
import articleadmin from '../admin/articleadmin'
import useradmin from '../admin/useradmin'
import categoryadmin from '../admin/categoryadmin'
export default {
    name:'adminpages',
    components:{pagetitle, articleadmin, useradmin, categoryadmin}
}
</script>

<style>

</style>
